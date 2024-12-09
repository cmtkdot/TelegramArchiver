import { S3 } from "@replit/node-s3";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";

const s3Client = new S3(process.env.REPLIT_DB_URL!, {
  bucket: "replit-objstore-f68c34e2-ee87-4296-b5b4-ccd2b8ee9862",
});

export async function downloadMedia(
  file: TelegramBot.File,
  _storagePath: string // Keeping parameter for compatibility
): Promise<string> {
  try {
    const fileExt = path.extname(file.file_path || "") || ".bin";
    const objectId = `${uuidv4()}${fileExt}`;

    // Get the file URL from Telegram
    const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;
    
    // Download the file using fetch
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }
    
    const buffer = Buffer.from(await response.arrayBuffer());
    
    // Upload to Replit Object Storage
    await s3Client.putObject(objectId, buffer, {
      contentType: fileExt.startsWith(".") ? `image/${fileExt.slice(1)}` : "application/octet-stream",
    });

    return objectId;
  } catch (error) {
    console.error("Error uploading to object storage:", error);
    throw error;
  }
}

export async function getMediaUrl(objectId: string): Promise<string> {
  try {
    const url = await s3Client.getSignedUrl(objectId, 3600); // URL valid for 1 hour
    return url;
  } catch (error) {
    console.error("Error getting signed URL:", error);
    throw error;
  }
}
