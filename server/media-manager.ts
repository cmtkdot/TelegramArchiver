import fs from "fs";
import path from "path";
import crypto from "crypto";
import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";

export async function downloadMedia(
  file: TelegramBot.File,
  storagePath: string
): Promise<string> {
  const fileExt = path.extname(file.file_path || "") || ".bin";
  const fileName = `${crypto.randomBytes(16).toString("hex")}${fileExt}`;
  const filePath = path.join(storagePath, fileName);

  // Get the file URL from Telegram
  const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;
  
  // Download the file using fetch
  const response = await fetch(fileUrl);
  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.statusText}`);
  }
  
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.promises.writeFile(filePath, buffer);

  return fileName;
}
