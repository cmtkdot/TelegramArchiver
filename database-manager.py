import asyncpg
from datetime import datetime
from typing import Dict, Any

class DatabaseManager:
    def __init__(self, database_url: str):
        self.database_url = database_url
        self.pool = None

    async def initialize(self):
        """Initialize database connection pool"""
        self.pool = await asyncpg.create_pool(self.database_url)
        await self._create_tables()

    async def _create_tables(self):
        """Create necessary database tables if they don't exist"""
        async with self.pool.acquire() as conn:
            await conn.execute('''
                CREATE TABLE IF NOT EXISTS downloads (
                    id SERIAL PRIMARY KEY,
                    channel_id BIGINT NOT NULL,
                    channel_name TEXT NOT NULL,
                    file_id TEXT NOT NULL,
                    file_path TEXT NOT NULL,
                    file_type TEXT NOT NULL,
                    file_size BIGINT NOT NULL,
                    mime_type TEXT,
                    download_time TIMESTAMP NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );

                CREATE INDEX IF NOT EXISTS idx_channel_id ON downloads(channel_id);
                CREATE INDEX IF NOT EXISTS idx_file_type ON downloads(file_type);
                CREATE INDEX IF NOT EXISTS idx_download_time ON downloads(download_time);
            ''')

    async def log_download(self, **kwargs):
        """Log a downloaded file to the database"""
        async with self.pool.acquire() as conn:
            await conn.execute('''
                INSERT INTO downloads (
                    channel_id, channel_name, file_id, file_path,
                    file_type, file_size, mime_type, download_time
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ''', 
                kwargs['channel_id'],
                kwargs['channel_name'],
                kwargs['file_id'],
                kwargs['file_path'],
                kwargs['file_type'],
                kwargs['file_size'],
                kwargs['mime_type'],
                kwargs['download_time']
            )

    async def get_statistics(self) -> Dict[str, Any]:
        """Get download statistics"""
        async with self.pool.acquire() as conn:
            # Get total files and size
            stats = await conn.fetchrow('''
                SELECT 
                    COUNT(*) as total_files,
                    COALESCE(SUM(file_size), 0) as total_size,
                    MAX(download_time) as last_download
                FROM downloads
            ''')

            # Get counts by type
            type_counts = await conn.fetch('''
                SELECT file_type, COUNT(*) as count
                FROM downloads
                GROUP BY file_type
            ''')

            return {
                'total_files': stats['total_files'],
                'total_size': self._format_size(stats['total_size']),
                'last_download': stats['last_download'].strftime('%Y-%m-%d %H:%M:%S'),
                'type_breakdown': {r['file_type']: r['count'] for r in type_counts}
            }

    async def get_channel_stats(self, channel_id: int) -> Dict[str, Any]:
        """Get statistics for a specific channel"""
        async with self.pool.acquire() as conn:
            stats = await conn.fetchrow('''
                SELECT 
                    COUNT(*) as total_files,
                    COALESCE(SUM(file_size), 0) as total_size,
                    MAX(download_time) as last_download
                FROM downloads
                WHERE channel_id = $1
            ''', channel_id)

            return {
                'total_files': stats['total_files'],
                'total_size': self._format_size(stats['total_size']),
                'last_download': stats['last_download'].strftime('%Y-%m-%d %H:%M:%S') if stats['last_download'] else None
            }

    def _format_size(self, size_bytes: int) -> str:
        """Format file size in human-readable format"""
        for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
            if size_bytes < 1024.0:
                return f"{size_bytes:.2f} {unit}"
            size_bytes /= 1024.0
        return f"{size_bytes:.2f} PB"

    async def cleanup_old_records(self, days: int):
        """Clean up old download records"""
        async with self.pool.acquire() as conn:
            await conn.execute('''
                DELETE FROM downloads
                WHERE download_time < NOW() - INTERVAL '$1 days'
            ''', days)

    async def close(self):
        """Close database connection pool"""
        if self.pool:
            await self.pool.close()
