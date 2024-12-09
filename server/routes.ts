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
        channelId: channels.channelId,
        name: channels.name,
        description: channels.description,
        joinedAt: channels.joinedAt,
        isActive: channels.isActive,
        mediaCount: sql`COUNT(${media.id})::integer`,
        lastMediaAt: sql`MAX(${media.createdAt})`
      })
      .from(channels)
      .leftJoin(media, eq(channels.channelId, media.channelId))
      .groupBy(channels.id)
      .orderBy(desc(channels.joinedAt));
      
      res.json(result);
    } catch (err) {
      console.error('Error fetching channels:', err);
      res.status(500).json({ error: "Failed to fetch channels" });
    }
  });

  app.post("/api/channels", async (req, res) => {
    try {
      const { channelId } = req.body;
      const result = await db.insert(channels).values({
        channelId,
        name: channelId, // Will be updated by bot
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
        ? eq(media.channelId, channelId)
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
      const signedUrl = await getMediaUrl(req.params.objectId);
      res.json({ url: signedUrl });
    } catch (error) {
      console.error("Error getting media URL:", error);
      res.status(404).json({ error: "File not found" });
    }
  });

  // System logs
  app.get("/api/logs", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const logs = await db.select().from(systemLogs)
        .orderBy(desc(systemLogs.timestamp))
        .limit(limit);
      res.json(logs);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch logs" });
    }
  });
}
