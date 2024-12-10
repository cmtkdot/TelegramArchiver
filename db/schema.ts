import { pgTable, text, integer, timestamp, jsonb, boolean, bigint } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  telegramId: bigint("telegram_id", { mode: "number" }).unique().notNull(),
  username: text("username"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  lastActive: timestamp("last_active").defaultNow(),
});

export const channels = pgTable("channels", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  link: text("link").unique().notNull(),
  title: text("title"),
  isActive: boolean("is_active").default(true),
  addedBy: bigint("added_by", { mode: "number" }).references(() => users.telegramId),
  addedAt: timestamp("added_at").defaultNow(),
  lastChecked: timestamp("last_checked").defaultNow(),
});

export const media = pgTable("media", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  channelId: integer("channel_id").references(() => channels.id),
  fileId: text("file_id").unique().notNull(),
  messageId: integer("message_id"),
  mediaType: text("media_type"),
  filename: text("filename"),
  fileSize: integer("file_size"),
  mimeType: text("mime_type"),
  localPath: text("local_path"),
  caption: text("caption"),
  createdAt: timestamp("created_at").defaultNow(),
  downloadedAt: timestamp("downloaded_at"),
});

export const systemLogs = pgTable("system_logs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  level: text("level").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  metadata: jsonb("metadata"),
});

// Schema for user operations
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export type User = z.infer<typeof selectUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Schema for channel operations
export const insertChannelSchema = createInsertSchema(channels);
export const selectChannelSchema = createSelectSchema(channels);
export type Channel = z.infer<typeof selectChannelSchema>;
export type InsertChannel = z.infer<typeof insertChannelSchema>;

// Schema for media operations
export const insertMediaSchema = createInsertSchema(media);
export const selectMediaSchema = createSelectSchema(media);
export type Media = z.infer<typeof selectMediaSchema>;
export type InsertMedia = z.infer<typeof insertMediaSchema>;

// Schema for system logs operations
export const insertLogSchema = createInsertSchema(systemLogs);
export const selectLogSchema = createSelectSchema(systemLogs);
export type SystemLog = z.infer<typeof selectLogSchema>;
export type InsertLog = z.infer<typeof insertLogSchema>;

// Cleanup function type
export const cleanup_old_logs = sql`
  CREATE OR REPLACE FUNCTION cleanup_old_logs() RETURNS void AS $$
  BEGIN
      DELETE FROM system_logs 
      WHERE created_at < NOW() - INTERVAL '30 days';
  END;
  $$ LANGUAGE plpgsql;
`;

// Cleanup trigger type
export const cleanup_trigger = sql`
  CREATE OR REPLACE FUNCTION trigger_cleanup_old_logs()
  RETURNS TRIGGER AS $$
  BEGIN
      IF (SELECT COUNT(*) FROM system_logs) > 10000 THEN
          PERFORM cleanup_old_logs();
      END IF;
      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS cleanup_logs_trigger ON system_logs;
  
  CREATE TRIGGER cleanup_logs_trigger
  AFTER INSERT ON system_logs
  FOR EACH STATEMENT
  EXECUTE FUNCTION trigger_cleanup_old_logs();
`;
