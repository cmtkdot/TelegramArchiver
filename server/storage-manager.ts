import Database from "@replit/database";
import path from 'path';

// Initialize storage client
const storage = new Database(process.env.REPLIT_DB_URL);

// Ensure storage is initialized properly
storage.list().catch(error => {
  console.error("Failed to initialize storage:", error);
  process.exit(1);
});

// Define types for stored data
interface StoredFileData {
  data: string;
  type: string;
  filename: string;
  uploaded: string;
}

export class StorageManager {
  private bucketPrefix: string = 'media-files/';
  
  constructor(prefix?: string) {
    if (prefix) {
      this.bucketPrefix = prefix.endsWith('/') ? prefix : `${prefix}/`;
    }
  }

  /**
   * Upload a file to object storage
   */
  async uploadFile(
    buffer: Buffer,
    filename: string,
    mediaType: string
  ): Promise<string> {
    try {
      // Generate a unique path for the file
      const key = `${this.bucketPrefix}${mediaType}/${path.basename(filename)}`;
      
      // Convert buffer to base64 for storage
      const base64Data = buffer.toString('base64');
      
      const fileData: StoredFileData = {
        data: base64Data,
        type: mediaType,
        filename: filename,
        uploaded: new Date().toISOString()
      };
      
      // Store in Replit Database
      await storage.set(key, JSON.stringify(fileData));
      return key;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  /**
   * Get a file from object storage
   */
  async getFile(key: string): Promise<Buffer> {
    try {
      const rawData = await storage.get(key) as unknown;
      if (!rawData) {
        throw new Error('File not found');
      }
      
      const fileData = JSON.parse(rawData as string) as StoredFileData;
      if (!fileData.data) {
        throw new Error('Invalid file data');
      }
      
      return Buffer.from(fileData.data, 'base64');
    } catch (error) {
      console.error("Error getting file:", error);
      throw error;
    }
  }

  /**
   * Delete a file from object storage
   */
  async deleteFile(key: string): Promise<void> {
    try {
      await storage.delete(key);
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }

  /**
   * Get file metadata
   */
  async getFileInfo(key: string): Promise<{
    type: string;
    filename: string;
    uploaded: string;
    size: number;
  } | null> {
    try {
      const rawData = await storage.get(key) as unknown;
      if (!rawData) {
        return null;
      }

      const fileData = JSON.parse(rawData as string) as StoredFileData;
      return {
        type: fileData.type,
        filename: fileData.filename,
        uploaded: fileData.uploaded,
        size: Math.ceil((fileData.data.length * 3) / 4), // Approximate size from base64
      };
    } catch (error) {
      console.error("Error getting file info:", error);
      throw error;
    }
  }

  /**
   * List all files in storage
   */
  async listFiles(): Promise<string[]> {
    try {
      const keys = (await storage.list(this.bucketPrefix) as unknown) as string[];
      return keys;
    } catch (error) {
      console.error("Error listing files:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const storageManager = new StorageManager();
