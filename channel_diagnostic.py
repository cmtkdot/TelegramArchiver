import os
import asyncio
import logging
from datetime import datetime
from dotenv import load_dotenv
from telegram import Bot
from telegram.error import TelegramError
import psycopg2
from psycopg2.extras import Json

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Database connection
def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

async def get_bot_channels():
    """Get all channels and groups the bot is member of."""
    try:
        bot = Bot(token=os.environ['TELEGRAM_BOT_TOKEN'])
        
        # Get bot information
        me = await bot.get_me()
        logger.info(f"Bot Information: @{me.username} (ID: {me.id})")
        
        # Initialize updates to get chat information
        updates = await bot.get_updates()
        
        # Store unique chats
        unique_chats = {}
        
        # Get chat information from updates
        for update in updates:
            chat = None
            if update.channel_post:
                chat = update.channel_post.chat
            elif update.message:
                chat = update.message.chat
            
            if chat and chat.id not in unique_chats:
                try:
                    # Get detailed chat information
                    chat_info = await bot.get_chat(chat.id)
                    unique_chats[chat.id] = chat_info
                    
                    # Log chat information
                    logger.info(f"\nFound chat:")
                    logger.info(f"Title: {chat_info.title}")
                    logger.info(f"Type: {chat_info.type}")
                    logger.info(f"ID: {chat_info.id}")
                    logger.info(f"Description: {chat_info.description or 'No description'}")
                    
                    # Store in database
                    with get_db_connection() as conn:
                        with conn.cursor() as cur:
                            cur.execute("""
                                INSERT INTO channels (channel_id, name, description)
                                VALUES (%s, %s, %s)
                                ON CONFLICT (channel_id) 
                                DO UPDATE SET 
                                    name = EXCLUDED.name,
                                    description = EXCLUDED.description
                            """, (
                                str(chat_info.id),
                                chat_info.title,
                                chat_info.description
                            ))
                            
                            # Log to system_logs
                            cur.execute("""
                                INSERT INTO system_logs (level, message, metadata)
                                VALUES (%s, %s, %s)
                            """, (
                                'info',
                                f'Found channel: {chat_info.title}',
                                Json({
                                    'chat_id': str(chat_info.id),
                                    'chat_type': chat_info.type,
                                    'member_count': getattr(chat_info, 'member_count', None)
                                })
                            ))
                            conn.commit()
                    
                except TelegramError as e:
                    logger.error(f"Error getting chat info: {e}")
        
        if not unique_chats:
            logger.warning("No channels or groups found. Make sure to:")
            logger.warning("1. Add the bot to your channels/groups")
            logger.warning("2. Make the bot an administrator")
            logger.warning("3. Send some messages in the channels")
            
            # Log warning to database
            with get_db_connection() as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        INSERT INTO system_logs (level, message)
                        VALUES (%s, %s)
                    """, ('warning', 'No channels or groups found for the bot'))
                    conn.commit()
    
    except Exception as e:
        logger.error(f"Error: {e}")
        # Log error to database
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO system_logs (level, message)
                    VALUES (%s, %s)
                """, ('error', f'Error in channel diagnostic: {str(e)}'))
                conn.commit()
    finally:
        await bot.close()

if __name__ == '__main__':
    asyncio.run(get_bot_channels())
