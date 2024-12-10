import os
import psycopg2
from psycopg2.extras import Json
from datetime import datetime
from typing import Dict, Any
import logging

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

class DatabaseManager:
    def __init__(self, database_url: str = None):
        self.database_url = database_url or os.getenv('DATABASE_URL')
        if not self.database_url:
            raise ValueError("DATABASE_URL environment variable is not set")

    def get_connection(self):
        """Get a database connection"""
        return psycopg2.connect(self.database_url)

    def initialize_database(self):
        """Initialize the database with the correct schema"""
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    # Create tables
                    cur.execute("""
                        -- Create users table if not exists
                        CREATE TABLE IF NOT EXISTS users (
                            id SERIAL PRIMARY KEY,
                            telegram_id BIGINT UNIQUE NOT NULL,
                            username VARCHAR(255),
                            is_admin BOOLEAN DEFAULT FALSE,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        );

                        -- Create channels table if not exists
                        CREATE TABLE IF NOT EXISTS channels (
                            id SERIAL PRIMARY KEY,
                            link VARCHAR(255) UNIQUE NOT NULL,
                            title VARCHAR(255),
                            is_active BOOLEAN DEFAULT TRUE,
                            added_by BIGINT REFERENCES users(telegram_id),
                            added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            last_checked TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                        );

                        -- Create media table if not exists
                        CREATE TABLE IF NOT EXISTS media (
                            id SERIAL PRIMARY KEY,
                            channel_id INTEGER REFERENCES channels(id),
                            file_id VARCHAR(255) UNIQUE NOT NULL,
                            message_id INTEGER,
                            media_type VARCHAR(50),
                            filename VARCHAR(255),
                            file_size INTEGER,
                            mime_type VARCHAR(100),
                            local_path VARCHAR(512),
                            caption TEXT,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            downloaded_at TIMESTAMP
                        );

                        -- Create system_logs table if not exists
                        CREATE TABLE IF NOT EXISTS system_logs (
                            id SERIAL PRIMARY KEY,
                            level VARCHAR(20) NOT NULL,
                            message TEXT NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            metadata JSONB
                        );
                    """)

                    # Create indexes if they don't exist
                    cur.execute("""
                        CREATE INDEX IF NOT EXISTS idx_media_channel ON media(channel_id);
                        CREATE INDEX IF NOT EXISTS idx_media_type ON media(media_type);
                        CREATE INDEX IF NOT EXISTS idx_media_created ON media(created_at);
                        CREATE INDEX IF NOT EXISTS idx_channels_added_by ON channels(added_by);
                        CREATE INDEX IF NOT EXISTS idx_channels_active ON channels(is_active);
                        CREATE INDEX IF NOT EXISTS idx_logs_level ON system_logs(level);
                        CREATE INDEX IF NOT EXISTS idx_logs_created ON system_logs(created_at);
                    """)
                    
                    conn.commit()
                    logger.info("Database initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing database: {e}")
            raise

    def log_system_event(self, level: str, message: str, metadata: dict = None):
        """Log a system event to the database"""
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        INSERT INTO system_logs (level, message, metadata)
                        VALUES (%s, %s, %s)
                    """, (level, message, Json(metadata) if metadata else None))
                    conn.commit()
        except Exception as e:
            logger.error(f"Error logging system event: {e}")

    def add_or_update_channel(self, link: str, title: str, added_by: int = None) -> int:
        """Add or update a channel in the database"""
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        INSERT INTO channels (link, title, added_by)
                        VALUES (%s, %s, %s)
                        ON CONFLICT (link) 
                        DO UPDATE SET 
                            title = EXCLUDED.title,
                            last_checked = CURRENT_TIMESTAMP
                        RETURNING id
                    """, (link, title, added_by))
                    channel_id = cur.fetchone()[0]
                    conn.commit()
                    return channel_id
        except Exception as e:
            logger.error(f"Error adding/updating channel: {e}")
            raise

    def add_media(self, channel_id: int, file_id: str, message_id: int,
                 media_type: str, file_size: int = None, mime_type: str = None,
                 caption: str = None) -> int:
        """Add a media entry to the database"""
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        INSERT INTO media (
                            channel_id, file_id, message_id, media_type,
                            file_size, mime_type, caption
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s)
                        ON CONFLICT (file_id) DO NOTHING
                        RETURNING id
                    """, (channel_id, file_id, message_id, media_type,
                          file_size, mime_type, caption))
                    result = cur.fetchone()
                    conn.commit()
                    return result[0] if result else None
        except Exception as e:
            logger.error(f"Error adding media: {e}")
            raise

    def get_channel_stats(self) -> Dict[str, Any]:
        """Get statistics about channels and media"""
        try:
            with self.get_connection() as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        SELECT 
                            COUNT(DISTINCT c.id) as channel_count,
                            COUNT(m.id) as media_count,
                            COALESCE(SUM(m.file_size), 0) as total_size
                        FROM channels c
                        LEFT JOIN media m ON c.id = m.channel_id
                        WHERE c.is_active = true
                    """)
                    stats = cur.fetchone()
                    return {
                        'channel_count': stats[0],
                        'media_count': stats[1],
                        'total_size': self._format_size(stats[2])
                    }
        except Exception as e:
            logger.error(f"Error getting channel stats: {e}")
            raise

    @staticmethod
    def _format_size(size_bytes: int) -> str:
        """Format file size in human-readable format"""
        for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
            if size_bytes < 1024.0:
                return f"{size_bytes:.2f} {unit}"
            size_bytes /= 1024.0
        return f"{size_bytes:.2f} PB"
