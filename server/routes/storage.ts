import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { storageManager } from '../storage-manager';
import { setupStorage, checkStorageHealth } from '../setup-storage';
import { prisma } from '../db';

const router = Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const tempDir = path.join(process.cwd(), 'storage', 'temp');
      cb(null, tempDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  }
});

// Initialize storage
router.post('/init', async (req, res) => {
  try {
    await setupStorage();
    const health = await checkStorageHealth();
    res.json(health);
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize storage' });
  }
});

// Check storage health
router.get('/health', async (req, res) => {
  try {
    const health = await checkStorageHealth();
    res.json(health);
  } catch (error) {
    res.status(500).json({ error: 'Failed to check storage health' });
  }
});

// Upload file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { buffer, originalname, mimetype } = req.file;
    const { caption } = req.body;

    // Upload to storage
    const { key, localPath, downloadUrl, size } = await storageManager.uploadFile(
      buffer,
      originalname,
      mimetype
    );

    // Save to database
    const media = await prisma.media.create({
      data: {
        filename: originalname,
        mimeType: mimetype,
        localPath,
        caption: caption || '',
        downloadUrl,
        size,
        createdAt: new Date(),
        downloadedAt: new Date(),
      }
    });

    res.json(media);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Download file
router.get('/download/:type/:filename', async (req, res) => {
  try {
    const { type, filename } = req.params;
    const key = path.join('media-files', type, filename);
    
    const file = await storageManager.getFile(key);
    const fileInfo = await storageManager.getFileInfo(key);
    
    if (!file || !fileInfo) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.setHeader('Content-Type', fileInfo.type);
    res.setHeader('Content-Disposition', `inline; filename="${fileInfo.filename}"`);
    res.send(file);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
});

// List files
router.get('/files', async (req, res) => {
  try {
    const files = await storageManager.listFiles();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list files' });
  }
});

// Get file info
router.get('/files/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const info = await storageManager.getFileInfo(key);
    
    if (!info) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get file info' });
  }
});

// Delete file
router.delete('/files/:key', async (req, res) => {
  try {
    const { key } = req.params;
    await storageManager.deleteFile(key);
    
    // Also delete from database
    await prisma.media.deleteMany({
      where: {
        localPath: key
      }
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Get storage stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await storageManager.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get storage stats' });
  }
});

export default router; 