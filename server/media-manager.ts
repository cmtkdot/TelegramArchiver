import { v4 as uuidv4 } from "uuid";
import path from "path";
import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";
import fs from "fs/promises";

// Initialize storage path for media files
const STORAGE_PATH = path.join(process.cwd(), "public", "media");

// Ensure storage directory exists
async function ensureStorageExists() {
  try {
    await fs.access(STORAGE_PATH);
  } catch {
    console.log('Creating media storage directory:', STORAGE_PATH);
    await fs.mkdir(STORAGE_PATH, { recursive: true });
  }
  console.log('Media storage directory ready:', STORAGE_PATH);
}

// Initialize storage on module load
ensureStorageExists().catch(error => {
  console.error('Failed to initialize media storage:', error);
});

export async function downloadMedia(
  file: TelegramBot.File,
  _storagePath: string
): Promise<string> {
  try {
    await ensureStorageExists();
    
    const fileExt = path.extname(file.file_path || "") || ".bin";
    const objectId = `${uuidv4()}${fileExt}`;
    const filePath = path.join(STORAGE_PATH, objectId);

    // Get the file URL from Telegram
    const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;
    
    // Download the file using fetch
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }
    
    const buffer = Buffer.from(await response.arrayBuffer());
    
    // Save to local storage
    await fs.writeFile(filePath, buffer);

    return objectId;
  } catch (error) {
    console.error("Error saving media:", error);
    throw error;
  }
}

export async function getMediaUrl(objectId: string): Promise<string> {
  try {
    const filePath = path.join(STORAGE_PATH, objectId);
    // Check if file exists
    await fs.access(filePath);
    // Return URL that will be handled by Express static middleware
    return `/media/${objectId}`;
  } catch (error) {
    console.error("Error getting media URL:", error);
    throw error;
  }
}
