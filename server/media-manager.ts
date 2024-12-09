import fs from "fs";
import path from "path";
import crypto from "crypto";
import TelegramBot from "node-telegram-bot-api";

export async function downloadMedia(
  file: TelegramBot.File,
  storagePath: string
): Promise<string> {
  const fileExt = path.extname(file.file_path || "") || ".bin";
  const fileName = `${crypto.randomBytes(16).toString("hex")}${fileExt}`;
  const filePath = path.join(storagePath, fileName);

  const fileData = await file.download();
  await fs.promises.writeFile(filePath, fileData);

  return fileName;
}
