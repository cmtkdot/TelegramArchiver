import { v4 as uuidv4 } from "uuid";
import path from "path";
import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";
import { db } from "../db";
import { media } from "@db/schema";
import { eq } from "drizzle-orm";
import { storageManager } from "./storage-manager";

// Media types and their extensions
const MEDIA_EXTENSIONS: Record<string, string> = {
  photo: ".jpg",
  video: ".mp4",
  document: "", // Will use original extension
  audio: ".mp3",
  voice: ".ogg",
  animation: ".mp4",
};

export async function downloadMedia(
  file: { 
    file_id: string; 
    file_path?: string; 
    file_unique_id?: string;
    media_type?: string;
  },
  originalFilename?: string
): Promise<string> {
  try {
    // Get file extension
    let fileExt = path.extname(originalFilename || file.file_path || "").toLowerCase();
    if (!fileExt && file.media_type) {
      fileExt = MEDIA_EXTENSIONS[file.media_type] || ".bin";
    }

    // Generate unique filename
    const objectId = `${uuidv4()}${fileExt}`;
    const filename = `${objectId}`;

    // Get Telegram download URL
    const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;
    
    // Download the file
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }
    
    const buffer = Buffer.from(await response.arrayBuffer());
    
    // Upload to storage
    const storageKey = await storageManager.uploadFile(
      buffer,
      filename,
      file.media_type || 'unknown'
    );
    
    // Update database with storage location
    if (file.file_id) {
      await db.update(media)
        .set({ 
          localPath: storageKey,
          downloadUrl: `/api/media/file/${objectId}`,
          status: 'ready'
        })
        .where(eq(media.fileId, file.file_id));
    }

    return objectId;
  } catch (error) {
    console.error("Error saving media:", error);
    throw error;
  }
}

export async function getMediaUrl(objectId: string): Promise<string> {
  try {
    const info = await storageManager.getFileInfo(objectId);
    if (!info) {
      throw new Error("File not found");
    }
    return `/api/media/file/${objectId}`;
  } catch (error) {
    console.error("Error getting media URL:", error);
    throw new Error("File not found");
  }
}

export async function deleteMedia(objectId: string): Promise<void> {
  try {
    await storageManager.deleteFile(objectId);
  } catch (error) {
    console.error("Error deleting media:", error);
    throw error;
  }
}

// Get file info including size, type, etc.
export async function getMediaInfo(objectId: string): Promise<{
  size: number;
  created: Date;
  modified: Date;
  mime?: string;
}> {
  try {
    const info = await storageManager.getFileInfo(objectId);
    if (!info) {
      throw new Error("File not found");
    }
    
    return {
      size: info.size,
      created: new Date(info.uploaded),
      modified: new Date(info.uploaded),
      mime: info.type
    };
  } catch (error) {
    console.error("Error getting media info:", error);
    throw error;
  }
}
