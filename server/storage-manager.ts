import Database from "@replit/database";
import path from 'path';
import fs from 'fs/promises';
import { StorageConfig } from '../client/src/lib/api';

// Initialize storage client
const storage = new Database(process.env.REPLIT_DB_URL);

// Ensure storage is initialized properly
storage.list().catch(error => {
  console.error("Failed to initialize storage:", error);
  process.exit(1);
});

interface StoredFileData {
  data: string;
  type: string;
  filename: string;
  uploaded: string;
  localPath: string;
  downloadUrl: string;
  size: number;
}

export class StorageManager {
  private bucketPrefix: string = 'media-files/';
  private baseStoragePath: string;
  private baseDownloadUrl: string;
  
  constructor(config?: StorageConfig) {
    this.baseStoragePath = path.join(process.cwd(), 'storage', 'media');
    this.baseDownloadUrl = process.env.BASE_URL || 'http://localhost:3000';
    
    if (config?.path) {
      this.bucketPrefix = config.path.endsWith('/') ? config.path : `${config.path}/`;
    }
  }

  /**
   * Upload a file to storage and save metadata
   */
  async uploadFile(
    buffer: Buffer,
    filename: string,
    mediaType: string
  ): Promise<{
    key: string;
    localPath: string;
    downloadUrl: string;
    size: number;
  }> {
    try {
      // Generate unique filename
      const uniqueFilename = `${Date.now()}-${path.basename(filename)}`;
      const mediaFolder = mediaType.split('/')[0]; // e.g., 'image' from 'image/jpeg'
      const relativePath = path.join(this.bucketPrefix, mediaFolder, uniqueFilename);
      const localPath = path.join(this.baseStoragePath, mediaFolder, uniqueFilename);
      
      // Ensure directory exists
      await fs.mkdir(path.dirname(localPath), { recursive: true });
      
      // Save file to local storage
      await fs.writeFile(localPath, buffer);
      
      // Generate download URL
      const downloadUrl = `${this.baseDownloadUrl}/api/media/download/${mediaFolder}/${uniqueFilename}`;
      
      // Store metadata
      const fileData: StoredFileData = {
        data: '', // We don't store the actual data in DB anymore
        type: mediaType,
        filename: uniqueFilename,
        uploaded: new Date().toISOString(),
        localPath: relativePath,
        downloadUrl,
        size: buffer.length,
      };
      
      await this.saveMetadata(relativePath, fileData);
      
      return {
        key: relativePath,
        localPath: relativePath,
        downloadUrl,
        size: buffer.length,
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  /**
   * Get a file from storage
   */
  async getFile(key: string): Promise<Buffer> {
    try {
      const metadata = await this.getFileInfo(key);
      if (!metadata) {
        throw new Error('File not found');
      }
      
      const fullPath = path.join(this.baseStoragePath, metadata.localPath);
      return fs.readFile(fullPath);
    } catch (error) {
      console.error("Error getting file:", error);
      throw error;
    }
  }

  /**
   * Delete a file from storage
   */
  async deleteFile(key: string): Promise<void> {
    try {
      const metadata = await this.getFileInfo(key);
      if (metadata) {
        const fullPath = path.join(this.baseStoragePath, metadata.localPath);
        await fs.unlink(fullPath);
        await this.deleteMetadata(key);
      }
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
    localPath: string;
    downloadUrl: string;
    size: number;
  } | null> {
    try {
      const fileData = await this.getMetadata(key);
      if (!fileData) return null;

      return {
        type: fileData.type,
        filename: fileData.filename,
        uploaded: fileData.uploaded,
        localPath: fileData.localPath,
        downloadUrl: fileData.downloadUrl,
        size: fileData.size,
      };
    } catch (error) {
      console.error("Error getting file info:", error);
      throw error;
    }
  }

  /**
   * List all files in storage
   */
  async listFiles(): Promise<Array<{
    key: string;
    type: string;
    filename: string;
    uploaded: string;
    localPath: string;
    downloadUrl: string;
    size: number;
  }>> {
    try {
      const keys = await this.listMetadataKeys();
      const files = await Promise.all(
        keys.map(async (key) => {
          const info = await this.getFileInfo(key);
          return info ? { key, ...info } : null;
        })
      );
      return files.filter((f): f is NonNullable<typeof f> => f !== null);
    } catch (error) {
      console.error("Error listing files:", error);
      throw error;
    }
  }

  /**
   * Get storage statistics
   */
  async getStats(): Promise<{
    totalFiles: number;
    totalSize: number;
    fileTypes: Record<string, number>;
  }> {
    try {
      const files = await this.listFiles();
      const stats = files.reduce(
        (acc, file) => {
          acc.totalSize += file.size;
          acc.fileTypes[file.type] = (acc.fileTypes[file.type] || 0) + 1;
          return acc;
        },
        { totalFiles: files.length, totalSize: 0, fileTypes: {} as Record<string, number> }
      );
      return stats;
    } catch (error) {
      console.error("Error getting storage stats:", error);
      throw error;
    }
  }

  // Private methods for metadata management
  private async saveMetadata(key: string, data: StoredFileData): Promise<void> {
    await storage.set(`meta:${key}`, JSON.stringify(data));
  }

  private async getMetadata(key: string): Promise<StoredFileData | null> {
    const rawData = await storage.get(`meta:${key}`);
    const data = rawData?.ok ? (rawData.value as string) : null;
    return data ? JSON.parse(data) : null;
  }

  private async deleteMetadata(key: string): Promise<void> {
    await storage.delete(`meta:${key}`);
  }

  private async listMetadataKeys(): Promise<string[]> {
    const result = await storage.list('meta:');
    if (!result.ok) {
      return [];
    }
    const keys = result.value as string[];
    return keys.map(key => key.replace('meta:', ''));
  }
}

// Export singleton instance
export const storageManager = new StorageManager();
