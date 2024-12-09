import os
import asyncio
import logging
from datetime import datetime
from telegram.ext import (
    Application,
    MessageHandler,
    ContextTypes,
    filters,
)
from telegram import Update
import psycopg2
from psycopg2.extras import Json

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Database connection
def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

async def handle_media(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle incoming media messages."""
    try:
        # Get message info - specifically look for channel posts
        message = update.channel_post
        if not message:
            # Not a channel post, ignore
            return

        channel_id = str(message.chat.id)
        channel_name = message.chat.title or channel_id
        
        # Log processing start
        logger.info(f"Processing message from channel: {channel_name} ({channel_id})")
        
        # Connect to database
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                # Update or insert channel info
                cur.execute("""
                    INSERT INTO channels (channel_id, name, description)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (channel_id) 
                    DO UPDATE SET 
                        name = EXCLUDED.name,
                        description = EXCLUDED.description
                    RETURNING id
                """, (channel_id, channel_name, message.chat.description))
                conn.commit()
                
                # Handle media content
                media_file = None
                media_type = None
                metadata = {}

                # Check for photo
                if message.photo:
                    # Get the highest resolution photo
                    media_file = message.photo[-1]
                    media_type = 'photo'
                    metadata = {
                        'width': media_file.width,
                        'height': media_file.height,
                        'file_size': media_file.file_size,
                        'photo_sizes': len(message.photo)
                    }
                # Check for video
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
                    
                    # Get file information from Telegram
                    file = await context.bot.get_file(media_file.file_id)
                    if not file.file_path:
                        raise ValueError("No file path received from Telegram")
                    
                    # Save media info to database
                    cur.execute("""
                        INSERT INTO media 
                        (message_id, channel_id, type, file_id, file_path, caption, metadata)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                    """, (
                        message.message_id,
                        channel_id,
                        media_type,
                        media_file.file_id,
                        file.file_path,
                        message.caption,
                        Json(metadata)
                    ))
                    conn.commit()

                    # Log success
                    cur.execute("""
                        INSERT INTO system_logs (level, message, metadata)
                        VALUES (%s, %s, %s)
                    """, (
                        'info',
                        f'Processed {media_type} from channel {channel_name}',
                        Json(metadata)
                    ))
                    conn.commit()
                    logger.info(f"Successfully processed {media_type} from message {message.message_id}")

    except Exception as e:
        error_msg = str(e)
        logger.error(f"Error processing media: {error_msg}")
        # Log the error to database
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO system_logs (level, message)
                    VALUES (%s, %s)
                """, ('error', f'Error processing media: {error_msg}'))
                conn.commit()

async def main() -> None:
    """Start the bot."""
    application = None
    try:
        # Get bot token
        token = os.environ.get('TELEGRAM_BOT_TOKEN')
        if not token:
            raise ValueError("TELEGRAM_BOT_TOKEN environment variable is not set")
            
        # Log startup attempt
        logger.info("Initializing Telegram bot...")
        
        # Create the Application with specific configuration
        application = (
            Application.builder()
            .token(token)
            .read_timeout(30)  # Increased timeout for large media files
            .write_timeout(30)
            .connect_timeout(30)
            .pool_timeout(30)
            .build()
        )

        # Add message handler specifically for channel media
        application.add_handler(MessageHandler(
            filters.ChatType.CHANNEL & (filters.PHOTO | filters.VIDEO),
            handle_media,
            block=False  # Non-blocking to handle multiple messages
        ))

        # Log successful initialization
        logger.info("Bot handlers configured successfully")
        
        # Get bot information and log startup
        me = await application.bot.get_me()
        startup_message = f'Telegram monitor started as @{me.username}'
        
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO system_logs (level, message, metadata)
                    VALUES (%s, %s, %s)
                """, ('info', startup_message, Json({
                    'bot_id': me.id,
                    'bot_name': me.first_name,
                    'bot_username': me.username
                })))
                conn.commit()

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
                # Sleep instead of using an event to allow for cleaner shutdown
                await asyncio.sleep(1)
            except asyncio.CancelledError:
                logger.info("Received shutdown signal")
                break
            
    except Exception as e:
        error_msg = str(e)
        logger.error(f"Fatal error: {error_msg}")
        
        # Log error to database
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO system_logs (level, message, metadata)
                    VALUES (%s, %s, %s)
                """, ('error', f'Fatal error: {error_msg}', Json({
                    'error_type': type(e).__name__,
                    'error_details': str(e)
                })))
                conn.commit()
        raise
        
    finally:
        # Cleanup in finally block to ensure it runs
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
        pass  # Handle graceful shutdown
