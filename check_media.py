from database_manager import DatabaseManager
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

def main():
    try:
        # Initialize database manager
        db = DatabaseManager()
        
        # Get overall statistics
        stats = db.get_channel_stats()
        
        print("\n=== Overall Statistics ===")
        print(f"Total Channels: {stats['channel_count']}")
        print(f"Total Media Items: {stats['media_count']}")
        print(f"Total Storage Size: {stats['total_size']}")
        
        # Get detailed channel information
        with db.get_connection() as conn:
            with conn.cursor() as cur:
                # Get channel details
                cur.execute("""
                    SELECT 
                        c.id, c.link, c.title, c.is_active,
                        c.added_at, c.last_checked,
                        COUNT(m.id) as media_count
                    FROM channels c
                    LEFT JOIN media m ON c.id = m.channel_id
                    GROUP BY c.id
                    ORDER BY c.added_at DESC
                """)
                channels = cur.fetchall()
                
                if channels:
                    print("\n=== Channel Details ===")
                    for channel in channels:
                        print(f"\nChannel: {channel[2]} (ID: {channel[1]})")
                        print(f"Status: {'Active' if channel[3] else 'Inactive'}")
                        print(f"Added: {channel[4].strftime('%Y-%m-%d %H:%M:%S')}")
                        print(f"Last Check: {channel[5].strftime('%Y-%m-%d %H:%M:%S')}")
                        print(f"Media Count: {channel[6]}")
                        
                        # Get recent media for this channel
                        cur.execute("""
                            SELECT 
                                media_type,
                                file_size,
                                created_at,
                                caption
                            FROM media
                            WHERE channel_id = %s
                            ORDER BY created_at DESC
                            LIMIT 5
                        """, (channel[0],))
                        recent_media = cur.fetchall()
                        
                        if recent_media:
                            print("\nRecent Media:")
                            for media in recent_media:
                                size = db._format_size(media[1]) if media[1] else 'Unknown'
                                caption = (media[3][:50] + '...') if media[3] and len(media[3]) > 50 else media[3] or 'No caption'
                                print(f"- {media[0].upper()}: {size} | {media[2].strftime('%Y-%m-%d %H:%M:%S')} | {caption}")
                else:
                    print("\nNo channels found in the database.")
                    print("Make sure to:")
                    print("1. Add the bot as an administrator to your channel")
                    print("2. Send some media (photos/videos) to the channel")
                    print("3. Ensure the bot has proper permissions (Post Messages, Edit Messages, Delete Messages)")
        
    except Exception as e:
        logger.error(f"Error checking media: {e}")
        print(f"\nError: {str(e)}")
        print("\nTroubleshooting steps:")
        print("1. Check if the database is properly configured in .env")
        print("2. Verify the bot is running (python telegram_monitor.py)")
        print("3. Ensure the bot is an administrator in your channel")

if __name__ == "__main__":
    main() 