import fs from "fs";
import path from "path";
import crypto from "crypto";
import { File } from "telegram/types";

export async function downloadMedia(
  file: File,
  storagePath: string
): Promise<string> {
  const fileExt = path.extname(file.file_path || "") || ".bin";
  const fileName = `${crypto.randomBytes(16).toString("hex")}${fileExt}`;
  const filePath = path.join(storagePath, fileName);

  const fileData = await file.download();
  await fs.promises.writeFile(filePath, fileData);

  return fileName;
}
