import os
import asyncio
import logging
from datetime import datetime
from dotenv import load_dotenv
from telegram.ext import (
    Application,
    MessageHandler,
    ContextTypes,
    filters,
)
from telegram import Update
from database_manager import DatabaseManager

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Initialize database manager
db = DatabaseManager()

async def verify_bot_connection(token: str) -> bool:
    """Verify bot connection and permissions"""
    try:
        application = Application.builder().token(token).build()
        me = await application.bot.get_me()
        await application.shutdown()
        
        connection_info = {
            'bot_id': me.id,
            'username': me.username,
            'first_name': me.first_name,
            'is_bot': me.is_bot
        }
        
        success_message = (
            f"Successfully connected to Telegram API\n"
            f"Bot Information:\n"
            f"Username: @{me.username}\n"
            f"Bot ID: {me.id}\n"
            f"Name: {me.first_name}"
        )
        
        logger.info(success_message)
        db.log_system_event('info', success_message, connection_info)
        return True
        
    except Exception as e:
        error_message = f"Failed to connect to Telegram API: {str(e)}"
        logger.error(error_message)
        db.log_system_event('error', error_message, {'error': str(e)})
        return False

async def handle_media(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle incoming media messages."""
    try:
        # Get message info - specifically look for channel posts
        message = update.channel_post
        if not message:
            return

        channel_id = str(message.chat.id)
        channel_name = message.chat.title or channel_id
        
        logger.info(f"Processing message from channel: {channel_name} ({channel_id})")
        
        try:
            # Add or update channel
            db_channel_id = db.add_or_update_channel(
                link=channel_id,
                title=channel_name
            )
            
            # Handle media content
            media_file = None
            media_type = None
            metadata = {}

            if message.photo:
                media_file = message.photo[-1]
                media_type = 'photo'
                metadata = {
                    'width': media_file.width,
                    'height': media_file.height,
                    'file_size': media_file.file_size,
                    'photo_sizes': len(message.photo)
                }
            elif message.video:
                media_file = message.video
                media_type = 'video'
                metadata = {
                    'width': media_file.width,
                    'height': media_file.height,
                    'duration': media_file.duration,
                    'file_size': media_file.file_size,
                    'mime_type': media_file.mime_type
                }

            if media_file and media_type:
                logger.info(f"Found {media_type} in message {message.message_id}")
                
                file = await context.bot.get_file(media_file.file_id)
                if not file.file_path:
                    raise ValueError("No file path received from Telegram")
                
                # Add media to database
                db.add_media(
                    channel_id=db_channel_id,
                    file_id=media_file.file_id,
                    message_id=message.message_id,
                    media_type=media_type,
                    file_size=media_file.file_size,
                    mime_type=getattr(media_file, 'mime_type', None),
                    caption=message.caption
                )

                db.log_system_event(
                    'info',
                    f'Processed {media_type} from channel {channel_name}',
                    metadata
                )
                logger.info(f"Successfully processed {media_type} from message {message.message_id}")

        except Exception as db_error:
            error_msg = f"Database error while processing media: {str(db_error)}"
            logger.error(error_msg)
            db.log_system_event('error', error_msg)
            raise

    except Exception as e:
        error_msg = str(e)
        logger.error(f"Error processing media: {error_msg}")
        db.log_system_event('error', f'Error processing media: {error_msg}')

async def main() -> None:
    """Start the bot."""
    application = None
    try:
        # Initialize database
        db.initialize_database()
        
        # Get bot token
        token = os.getenv('TELEGRAM_BOT_TOKEN')
        if not token:
            raise ValueError("TELEGRAM_BOT_TOKEN environment variable is not set")
            
        # Verify bot connection first
        if not await verify_bot_connection(token):
            raise ValueError("Failed to verify bot connection")
            
        logger.info("Initializing Telegram bot...")
        
        # Create the Application with specific configuration
        application = (
            Application.builder()
            .token(token)
            .read_timeout(30)
            .write_timeout(30)
            .connect_timeout(30)
            .pool_timeout(30)
            .build()
        )

        # Add message handler specifically for channel media
        application.add_handler(MessageHandler(
            filters.ChatType.CHANNEL & (filters.PHOTO | filters.VIDEO),
            handle_media,
            block=False
        ))

        logger.info("Bot handlers configured successfully")
        
        # Start the application
        logger.info("Starting bot polling...")
        await application.initialize()
        await application.start()
        await application.updater.start_polling(
            allowed_updates=['channel_post'],
            drop_pending_updates=True
        )
        
        logger.info("Bot is running, waiting for channel posts...")
        
        # Keep the bot running until interrupted
        while True:
            try:
                await asyncio.sleep(1)
            except asyncio.CancelledError:
                logger.info("Received shutdown signal")
                break
            
    except Exception as e:
        error_msg = str(e)
        logger.error(f"Fatal error: {error_msg}")
        if 'db' in locals():
            db.log_system_event('error', f'Fatal error: {error_msg}', {
                'error_type': type(e).__name__,
                'error_details': str(e)
            })
        raise
        
    finally:
        if application:
            try:
                if hasattr(application, 'updater') and application.updater.running:
                    await application.updater.stop()
                if application.running:
                    await application.stop()
                logger.info("Bot shutdown completed")
            except Exception as cleanup_error:
                logger.error(f"Error during cleanup: {cleanup_error}")

if __name__ == '__main__':
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        pass
