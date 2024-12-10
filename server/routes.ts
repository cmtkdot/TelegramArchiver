import type { Express } from "express";
import { db } from "../db";
import { channels, media, systemLogs } from "@db/schema";
import { desc, eq, sql } from "drizzle-orm";
import path from "path";
import fs from "fs";

export function registerRoutes(app: Express) {
  // Channel management
  app.get("/api/channels", async (req, res) => {
    try {
      const result = await db.select({
        id: channels.id,
        link: channels.link,
        title: channels.title,
        isActive: channels.isActive,
        addedBy: channels.addedBy,
        addedAt: channels.addedAt,
        lastChecked: channels.lastChecked,
        mediaCount: channels.mediaCount,
        totalSize: channels.totalSize,
        status: channels.status
      })
      .from(channels)
      .orderBy(desc(channels.addedAt));
      
      // Format the response according to new ChannelWithStats interface
      const formattedResult = result.map(channel => ({
        id: channel.id,
        link: channel.link,
        title: channel.title,
        addedBy: channel.addedBy,
        status: channel.status,
        addedAt: channel.addedAt,
        lastChecked: channel.lastChecked,
        mediaCount: Number(channel.mediaCount) || 0,
        totalSize: formatFileSize(Number(channel.totalSize) || 0),
        isActive: Boolean(channel.isActive)
      }));
      
      res.json(formattedResult);
    } catch (err) {
      console.error('Error fetching channels:', err);
      res.status(500).json({ error: "Failed to fetch channels" });
    }
  });

  // Helper function to format file size
  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  app.post("/api/channels", async (req, res) => {
    try {
      const { link } = req.body;
      const result = await db.insert(channels).values({
        link,
        title: link, // Will be updated by bot
        isActive: true,
      }).returning();
      res.json(result[0]);
    } catch (err) {
      res.status(500).json({ error: "Failed to add channel" });
    }
  });

  // Media endpoints with enhanced functionality
  app.get("/api/media", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const channelId = req.query.channelId as string;

      if (page < 1) {
        return res.status(400).json({ error: "Page number must be greater than 0" });
      }

      const query = channelId 
        ? eq(channels.link, channelId)
        : undefined;

      const [mediaItems, totalCount] = await Promise.all([
        db.select({
          id: media.id,
          channelId: media.channelId,
          fileId: media.fileId,
          messageId: media.messageId,
          mediaType: media.mediaType,
          filename: media.filename,
          fileSize: media.fileSize,
          mimeType: media.mimeType,
          localPath: media.localPath,
          caption: media.caption,
          createdAt: media.createdAt,
          downloadedAt: media.downloadedAt,
          downloadUrl: media.downloadUrl,
          status: media.status,
          metadata: media.metadata
        })
        .from(media)
        .where(query)
        .orderBy(desc(media.createdAt))
        .limit(limit)
        .offset((page - 1) * limit),
        db.select({ count: sql`count(*)` }).from(media).where(query)
      ]);

      // Format the response according to new MediaItem interface
      const formattedMedia = mediaItems.map(item => ({
        id: item.id,
        channelId: item.channelId,
        messageId: item.messageId,
        fileId: item.fileId,
        filename: item.filename,
        mimeType: item.mimeType,
        localPath: item.localPath,
        downloadedAt: item.downloadedAt,
        caption: item.caption,
        createdAt: item.createdAt,
        mediaType: item.mediaType || 'unknown',
        fileSize: formatFileSize(Number(item.fileSize) || 0),
        downloadUrl: item.downloadUrl || `/api/media/${item.id}/download`
      }));

      res.json({
        media: formattedMedia,
        total: Number(totalCount[0].count),
        page,
        limit
      });
    } catch (err) {
      console.error('Error fetching media:', err);
      res.status(500).json({ error: "Failed to fetch media" });
    }
  });

  // Media file serving
  app.get("/api/media/file/:objectId", async (req, res) => {
    try {
      const { getMediaUrl } = await import("./media-manager");
      const fileUrl = await getMediaUrl(req.params.objectId);
      res.json({ url: fileUrl });
    } catch (error) {
      console.error("Error getting media URL:", error);
      res.status(404).json({ error: "File not found" });
    }
  });

  // Test endpoint to verify media storage
  app.post("/api/media/test", async (req, res) => {
    try {
      const testData = Buffer.from("Hello, this is a test file!");
      const { downloadMedia } = await import("./media-manager");
      
      // Create a mock telegram file object
      const mockFile = {
        file_id: "test_file",
        file_path: "test.txt",
        file_unique_id: "test_unique_id"
      };
      
      const savedPath = await downloadMedia(mockFile, "test.txt");
      const fileUrl = await getMediaUrl(savedPath);
      
      res.json({ 
        message: "Test file created successfully",
        path: savedPath,
        url: fileUrl
      });
    } catch (error) {
      console.error("Error in test endpoint:", error);
      res.status(500).json({ error: "Failed to create test file" });
    }
  });

  // System logs
  app.get("/api/logs", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const logs = await db.select().from(systemLogs)
        .orderBy(desc(systemLogs.createdAt))
        .limit(limit);
      res.json(logs);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch logs" });
    }
  });

  // Configure webhook
  app.post("/api/webhooks/configure", async (req, res) => {
    try {
      const { url, events, headers } = req.body;
      
      // Validate webhook configuration
      if (!url || !events || !Array.isArray(events) || events.length === 0) {
        return res.status(400).json({ 
          error: "Invalid webhook configuration. URL and events array are required." 
        });
      }

      // Store webhook configuration in system_logs for now
      await db.insert(systemLogs).values({
        level: 'info',
        message: 'Webhook configured',
        metadata: {
          url,
          events,
          headers: headers || {},
          configuredAt: new Date().toISOString()
        }
      });

      res.json({ id: Date.now() }); // Generate a unique ID based on timestamp
    } catch (err) {
      console.error('Error configuring webhook:', err);
      res.status(500).json({ error: "Failed to configure webhook" });
    }
  });

  // Get system statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const [channelsCount, mediaCount, totalSize] = await Promise.all([
        db.select({ count: sql`count(*)` }).from(channels),
        db.select({ count: sql`count(*)` }).from(media),
        db.select({ total: sql`sum(file_size)` }).from(media)
      ]);

      res.json({
        channels: Number(channelsCount[0].count),
        mediaItems: Number(mediaCount[0].count),
        totalSize: formatFileSize(Number(totalSize[0].total) || 0),
        status: "operational"
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch system stats" });
    }
  });
}
