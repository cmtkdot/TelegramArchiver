import { pgTable, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const channels = pgTable("channels", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  channelId: text("channel_id").unique().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  joinedAt: timestamp("joined_at").defaultNow(),
  isActive: integer("is_active").default(1),
});

export const media = pgTable("media", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  messageId: integer("message_id").notNull(),
  channelId: text("channel_id").notNull(),
  type: text("type").notNull(), // photo, video, etc
  fileId: text("file_id").notNull(),
  filePath: text("file_path"),
  caption: text("caption"),
  metadata: jsonb("metadata"),
  downloadedAt: timestamp("downloaded_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const systemLogs = pgTable("system_logs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  level: text("level").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  metadata: jsonb("metadata"),
});

export const insertChannelSchema = createInsertSchema(channels);
export const selectChannelSchema = createSelectSchema(channels);
export type Channel = z.infer<typeof selectChannelSchema>;
export type InsertChannel = z.infer<typeof insertChannelSchema>;

export const insertMediaSchema = createInsertSchema(media);
export const selectMediaSchema = createSelectSchema(media);
export type Media = z.infer<typeof selectMediaSchema>;
export type InsertMedia = z.infer<typeof insertMediaSchema>;

export const insertLogSchema = createInsertSchema(systemLogs);
export const selectLogSchema = createSelectSchema(systemLogs);
export type SystemLog = z.infer<typeof selectLogSchema>;
export type InsertLog = z.infer<typeof insertLogSchema>;
