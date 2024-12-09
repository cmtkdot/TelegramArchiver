import asyncio
import logging
from datetime import datetime
from typing import Optional, Dict, Any

from telegram import Update
from telegram.ext import (
    Application,
    ContextTypes,
    MessageHandler,
    CommandHandler,
    filters
)

from database import DatabaseManager
from file_manager import FileManager
from config import (
    BOT_TOKEN,
    MONITORED_CHANNELS,
    DOWNLOAD_PATH,
    DATABASE_URL
)

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

class TelegramMonitor:
    def __init__(self):
        self.db = DatabaseManager(DATABASE_URL)
        self.file_manager = FileManager(DOWNLOAD_PATH)
        self.monitored_channels = set(MONITORED_CHANNELS)
        self.download_queue = asyncio.Queue()
        self.processing = False

    async def start(self):
        """Initialize and start the bot application"""
        self.app = Application.builder().token(BOT_TOKEN).build()
        
        # Register handlers
        self.app.add_handler(CommandHandler("start", self.cmd_start))
        self.app.add_handler(CommandHandler("status", self.cmd_status))
        self.app.add_handler(CommandHandler("stats", self.cmd_stats))
        self.app.add_handler(MessageHandler(
            filters.PHOTO | filters.VIDEO | filters.DOCUMENT,
            self.handle_media
        ))

        # Start download worker
        asyncio.create_task(self.download_worker())
        
        # Start the bot
        await self.app.initialize()
        await self.app.start()
        await self.app.run_polling()

    async def cmd_start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle the /start command"""
        await update.message.reply_text(
            "🤖 Telegram Media Monitor Active\n"
            "Commands:\n"
            "/status - Check system status\n"
            "/stats - View download statistics"
        )

    async def cmd_status(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle the /status command"""
        queue_size = self.download_queue.qsize()
        storage_stats = self.file_manager.get_storage_stats()
        
        status_msg = (
            "📊 System Status\n"
            f"Queue Size: {queue_size}\n"
            f"Storage Used: {storage_stats['used']}\n"
            f"Storage Free: {storage_stats['free']}\n"
            f"Processing: {'🟢 Active' if self.processing else '⚪️ Idle'}"
        )
        await update.message.reply_text(status_msg)

    async def cmd_stats(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle the /stats command"""
        stats = await self.db.get_statistics()
        stats_msg = (
            "📈 Download Statistics\n"
            f"Total Files: {stats['total_files']}\n"
            f"Total Size: {stats['total_size']}\n"
            f"Last Download: {stats['last_download']}"
        )
        await update.message.reply_text(stats_msg)

    async def handle_media(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle incoming media messages"""
        if update.effective_chat.id not in self.monitored_channels:
            return

        message = update.effective_message
        media_info = self._extract_media_info(message)
        
        if media_info:
            await self.download_queue.put({
                'message': message,
                'media_info': media_info,
                'timestamp': datetime.now()
            })
            logger.info(f"Queued media: {media_info['file_id']}")

    def _extract_media_info(self, message) -> Optional[Dict[str, Any]]:
        """Extract media information from message"""
        if message.photo:
            media = message.photo[-1]  # Get highest resolution
            media_type = 'photo'
            file_id = media.file_id
        elif message.video:
            media = message.video
            media_type = 'video'
            file_id = media.file_id
        elif message.document:
            media = message.document
            media_type = 'document'
            file_id = media.file_id
        else:
            return None

        return {
            'file_id': file_id,
            'type': media_type,
            'size': getattr(media, 'file_size', 0),
            'mime_type': getattr(media, 'mime_type', None),
            'file_name': getattr(media, 'file_name', None)
        }

    async def download_worker(self):
        """Background worker for processing download queue"""
        while True:
            try:
                self.processing = False
                item = await self.download_queue.get()
                self.processing = True

                message = item['message']
                media_info = item['media_info']
                timestamp = item['timestamp']

                # Download file
                file = await message.effective_attachment.get_file()
                file_path = self.file_manager.generate_path(
                    media_info['type'],
                    media_info.get('file_name'),
                    timestamp
                )
                
                await file.download_to_drive(file_path)

                # Update database
                await self.db.log_download(
                    channel_id=message.chat.id,
                    channel_name=message.chat.title,
                    file_id=media_info['file_id'],
                    file_path=file_path,
                    file_type=media_info['type'],
                    file_size=media_info['size'],
                    mime_type=media_info['mime_type'],
                    download_time=timestamp
                )

                self.download_queue.task_done()
                logger.info(f"Downloaded: {file_path}")

            except Exception as e:
                logger.error(f"Download worker error: {str(e)}")
                await asyncio.sleep(5)  # Prevent rapid retries on failure

if __name__ == "__main__":
    monitor = TelegramMonitor()
    asyncio.run(monitor.start())
