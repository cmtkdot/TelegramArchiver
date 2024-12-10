import fs from 'fs/promises';
import path from 'path';
import { StorageConfig } from '../client/src/lib/api';

export async function setupStorage(config?: StorageConfig): Promise<void> {
  try {
    // Create base storage directory
    const baseStoragePath = path.join(process.cwd(), 'storage');
    await fs.mkdir(baseStoragePath, { recursive: true });

    // Create media subdirectories
    const mediaPath = path.join(baseStoragePath, 'media');
    await fs.mkdir(mediaPath, { recursive: true });

    // Create subdirectories for different media types
    const mediaTypes = ['image', 'video', 'document', 'audio'];
    await Promise.all(
      mediaTypes.map(type => 
        fs.mkdir(path.join(mediaPath, type), { recursive: true })
      )
    );

    // Create temp directory for uploads
    const tempPath = path.join(baseStoragePath, 'temp');
    await fs.mkdir(tempPath, { recursive: true });

    // Create .gitkeep files to preserve directory structure
    const directories = [
      baseStoragePath,
      mediaPath,
      ...mediaTypes.map(type => path.join(mediaPath, type)),
      tempPath
    ];

    await Promise.all(
      directories.map(dir => 
        fs.writeFile(path.join(dir, '.gitkeep'), '')
      )
    );

    console.log('Storage system initialized successfully');
  } catch (error) {
    console.error('Error setting up storage:', error);
    throw error;
  }
}

// Export function to check storage health
export async function checkStorageHealth(): Promise<{
  isHealthy: boolean;
  errors: string[];
  directories: {
    path: string;
    exists: boolean;
    writable: boolean;
  }[];
}> {
  const errors: string[] = [];
  const directories: {
    path: string;
    exists: boolean;
    writable: boolean;
  }[] = [];

  try {
    const baseStoragePath = path.join(process.cwd(), 'storage');
    const mediaPath = path.join(baseStoragePath, 'media');
    const mediaTypes = ['image', 'video', 'document', 'audio'];
    const tempPath = path.join(baseStoragePath, 'temp');

    const dirsToCheck = [
      baseStoragePath,
      mediaPath,
      ...mediaTypes.map(type => path.join(mediaPath, type)),
      tempPath
    ];

    for (const dir of dirsToCheck) {
      try {
        const exists = await fs.access(dir)
          .then(() => true)
          .catch(() => false);

        let writable = false;
        if (exists) {
          // Test write access by attempting to create and delete a temp file
          const testFile = path.join(dir, '.write-test');
          try {
            await fs.writeFile(testFile, '');
            await fs.unlink(testFile);
            writable = true;
          } catch {
            writable = false;
          }
        }

        directories.push({ path: dir, exists, writable });

        if (!exists) {
          errors.push(`Directory does not exist: ${dir}`);
        } else if (!writable) {
          errors.push(`Directory is not writable: ${dir}`);
        }
      } catch (error) {
        errors.push(`Error checking directory ${dir}: ${error}`);
      }
    }

    return {
      isHealthy: errors.length === 0,
      errors,
      directories
    };
  } catch (error) {
    return {
      isHealthy: false,
      errors: [`Fatal error checking storage health: ${error}`],
      directories
    };
  }
} 