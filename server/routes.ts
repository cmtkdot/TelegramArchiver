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
        addedAt: channels.addedAt,
        lastChecked: channels.lastChecked,
        mediaCount: sql`COUNT(${media.id})::integer`,
        lastMediaAt: sql`MAX(${media.createdAt})`
      })
      .from(channels)
      .leftJoin(media, eq(channels.id, media.channelId))
      .groupBy(channels.id)
      .orderBy(desc(channels.addedAt));
      
      res.json(result);
    } catch (err) {
      console.error('Error fetching channels:', err);
      res.status(500).json({ error: "Failed to fetch channels" });
    }
  });

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

  // Media endpoints
  app.get("/api/media", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const channelId = req.query.channelId as string;

      const query = channelId 
        ? eq(channels.link, channelId)
        : undefined;

      const [mediaItems, total] = await Promise.all([
        db.select().from(media)
          .where(query)
          .orderBy(desc(media.createdAt))
          .limit(limit)
          .offset((page - 1) * limit),
        db.select({ count: sql`count(*)` }).from(media).where(query)
      ]);

      res.json({
        media: mediaItems,
        total: total[0].count,
      });
    } catch (err) {
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
        file_path: "test.txt"
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
}
