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
        # Get message info
        message = update.channel_post or update.message
        if not message:
            return

        channel_id = str(message.chat.id)
        channel_name = message.chat.title or channel_id
        
        # Connect to database
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                # Update or insert channel info
                cur.execute("""
                    INSERT INTO channels (channel_id, name, description)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (channel_id) 
                    DO UPDATE SET name = EXCLUDED.name
                    RETURNING id
                """, (channel_id, channel_name, message.chat.description))
                conn.commit()
                
                # Handle media content
                media_file = None
                if message.photo:
                    media_file = message.photo[-1]
                    media_type = 'photo'
                    metadata = {
                        'width': media_file.width,
                        'height': media_file.height,
                        'file_size': media_file.file_size
                    }
                elif message.video:
                    media_file = message.video
                    media_type = 'video'
                    metadata = {
                        'width': media_file.width,
                        'height': media_file.height,
                        'duration': media_file.duration,
                        'file_size': media_file.file_size
                    }
                else:
                    return

                if media_file:
                    file = await context.bot.get_file(media_file.file_id)
                    file_path = file.file_path
                    
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
                        file_path,
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

    except Exception as e:
        error_msg = str(e)
        logger.error(f"Error processing media: {error_msg}")
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO system_logs (level, message)
                    VALUES (%s, %s)
                """, ('error', f'Error processing media: {error_msg}'))
                conn.commit()

async def main() -> None:
    """Start the bot."""
    try:
        # Get bot token
        token = os.environ.get('TELEGRAM_BOT_TOKEN')
        if not token:
            raise ValueError("No token provided")

        # Create the Application
        application = Application.builder().token(token).build()

        # Add message handler for media
        application.add_handler(MessageHandler(
            filters.PHOTO | filters.VIDEO | filters.CHANNEL,
            handle_media
        ))

        # Log startup
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO system_logs (level, message)
                    VALUES (%s, %s)
                """, ('info', 'Telegram monitor started'))
                conn.commit()

        logger.info("Starting bot...")
        await application.run_polling(allowed_updates=['message', 'channel_post'])

    except Exception as e:
        logger.error(f"Fatal error: {str(e)}")
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO system_logs (level, message)
                    VALUES (%s, %s)
                """, ('error', f'Fatal error: {str(e)}'))
                conn.commit()
        raise

if __name__ == '__main__':
    asyncio.run(main())
