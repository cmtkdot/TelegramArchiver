from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
import os
import json
from  import DatabaseManager

app = FastAPI(title="Telegram Media Archive API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database manager
db = DatabaseManager()

class WebhookConfig(BaseModel):
    url: str
    events: List[str]
    headers: Optional[Dict[str, str]] = None

# Models
class MediaItem(BaseModel):
    id: int
    channel_id: int
    media_type: str
    file_size: Optional[int]
    caption: Optional[str]
    created_at: datetime
    file_path: Optional[str]

@app.get("/api/channels")
async def get_channels():
    """Get all channels and their statistics"""
    try:
        with db.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT 
                        c.id, c.link, c.title, c.is_active,
                        c.added_at, c.last_checked,
                        COUNT(m.id) as media_count,
                        COALESCE(SUM(m.file_size), 0) as total_size
                    FROM channels c
                    LEFT JOIN media m ON c.id = m.channel_id
                    GROUP BY c.id
                    ORDER BY c.added_at DESC
                """)
                channels = cur.fetchall()
                
                return [{
                    'id': c[0],
                    'link': c[1],
                    'title': c[2],
                    'is_active': c[3],
                    'added_at': c[4].isoformat(),
                    'last_checked': c[5].isoformat(),
                    'media_count': c[6],
                    'total_size': db._format_size(c[7])
                } for c in channels]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/channels/{channel_id}/media")
async def get_channel_media(channel_id: int, page: int = 1, limit: int = 20):
    """Get media items for a specific channel with pagination"""
    try:
        with db.get_connection() as conn:
            with conn.cursor() as cur:
                # Get total count
                cur.execute("SELECT COUNT(*) FROM media WHERE channel_id = %s", (channel_id,))
                total = cur.fetchone()[0]
                
                # Get paginated media
                offset = (page - 1) * limit
                cur.execute("""
                    SELECT 
                        id, media_type, file_size, caption, 
                        created_at, file_id, local_path
                    FROM media 
                    WHERE channel_id = %s
                    ORDER BY created_at DESC
                    LIMIT %s OFFSET %s
                """, (channel_id, limit, offset))
                media = cur.fetchall()
                
                return {
                    'total': total,
                    'page': page,
                    'limit': limit,
                    'media': [{
                        'id': m[0],
                        'media_type': m[1],
                        'file_size': db._format_size(m[2]) if m[2] else 'Unknown',
                        'caption': m[3],
                        'created_at': m[4].isoformat(),
                        'file_id': m[5],
                        'local_path': m[6]
                    } for m in media]
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/media/{media_id}/download")
async def download_media(media_id: int):
    """Download a specific media file"""
    try:
        with db.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT file_id, media_type, local_path
                    FROM media 
                    WHERE id = %s
                """, (media_id,))
                media = cur.fetchone()
                
                if not media:
                    raise HTTPException(status_code=404, detail="Media not found")
                
                # If we have a local path, serve the file
                if media[2]:
                    return FileResponse(
                        media[2],
                        media_type=f"image/{media[1]}" if media[1] == 'photo' else "video/mp4",
                        filename=f"media_{media_id}.{media[1]}"
                    )
                else:
                    # TODO: Implement Telegram file download if not stored locally
                    raise HTTPException(status_code=501, detail="Direct Telegram download not implemented yet")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/webhooks/configure")
async def configure_webhook(config: WebhookConfig):
    """Configure a webhook for media updates"""
    try:
        with db.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO webhooks (url, events, headers)
                    VALUES (%s, %s, %s)
                    RETURNING id
                """, (config.url, json.dumps(config.events), json.dumps(config.headers)))
                webhook_id = cur.fetchone()[0]
                conn.commit()
                return {"id": webhook_id, "message": "Webhook configured successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/stats")
async def get_stats():
    """Get overall system statistics"""
    try:
        stats = db.get_channel_stats()
        return {
            'channels': stats['channel_count'],
            'media_items': stats['media_count'],
            'total_size': stats['total_size'],
            'status': 'healthy'
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 