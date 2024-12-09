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
        
        # Try to get specific channel first
        specific_channel_id = -1001562652591
        try:
            chat_info = await bot.get_chat(specific_channel_id)
            logger.info("\nFound specified channel:")
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
                    conn.commit()
        except TelegramError as e:
            logger.error(f"Error accessing channel {specific_channel_id}: {e}")
            # Log error details
            with get_db_connection() as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        INSERT INTO system_logs (level, message, metadata)
                        VALUES (%s, %s, %s)
                    """, ('error', f'Error accessing channel {specific_channel_id}', Json({
                        'error': str(e),
                        'channel_id': specific_channel_id
                    })))
                    conn.commit()
        
        # Then get all other channels
        updates = await bot.get_updates()
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
            
            # Get bot invite link and log detailed instructions
        bot_info = await bot.get_me()
        bot_invite_link = f"https://t.me/{bot_info.username}"
        
        instruction_message = f"""
No channels or groups found. To set up the bot:

1. Add @{bot_info.username} to your channels/groups using this link: {bot_invite_link}
2. Make the bot an administrator with these permissions:
   - Read Messages/View Messages
   - Delete Messages
   - Post Messages
   - Edit Messages
   - Manage Voice Chats
3. Send some test messages in the channels

Bot ID: {bot_info.id}
Bot Username: @{bot_info.username}
"""
        
        # Log detailed instructions to database
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO system_logs (level, message, metadata)
                    VALUES (%s, %s, %s)
                """, ('warning', instruction_message, Json({
                    'bot_id': bot_info.id,
                    'bot_username': bot_info.username,
                    'bot_invite_link': bot_invite_link
                })))
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
