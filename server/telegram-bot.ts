import TelegramBot from "node-telegram-bot-api";
import { db } from "../db";
import { channels, media, systemLogs } from "@db/schema";
import { eq } from "drizzle-orm";
import { downloadMedia } from "./media-manager";
import path from "path";
import fs from "fs";

export class TelegramArchiveBot {
  private bot: TelegramBot;
  private mediaStoragePath: string;

  constructor(token: string) {
    if (!token) {
      throw new Error("Telegram bot token is required");
    }
    
    this.bot = new TelegramBot(token, { 
      polling: true,
      filepath: false // Disable file downloading as we'll handle it manually
    });
    
    this.mediaStoragePath = path.join(process.cwd(), "media_storage");
    
    // Ensure media storage directory exists
    if (!fs.existsSync(this.mediaStoragePath)) {
      fs.mkdirSync(this.mediaStoragePath, { recursive: true });
    }

    // Setup error handler
    this.bot.on('error', async (error) => {
      console.error('Telegram Bot Error:', error);
      await this.logSystem('error', `Bot error: ${error.message}`);
    });

    // Setup polling error handler
    this.bot.on('polling_error', async (error) => {
      console.error('Polling Error:', error);
      await this.logSystem('error', `Polling error: ${error.message}`);
    });
  }

  async initialize() {
    try {
      const me = await this.bot.getMe();
      await this.logSystem("info", `Bot initialized as @${me.username}`);
      await this.startChannelMonitoring();
    } catch (error) {
      await this.logSystem("error", "Failed to initialize bot");
    }
  }

  private async startChannelMonitoring() {
    try {
      // Get all dialogs (chats) that the bot has access to
      const updates = await this.bot.getUpdates();
      const uniqueChats = new Set<TelegramBot.Chat>();
      
      updates.forEach(update => {
        if (update.channel_post?.chat) {
          uniqueChats.add(update.channel_post.chat);
        }
      });

      // Process each channel
      for (const chat of Array.from(uniqueChats)) {
        try {
          const channelId = chat.id.toString();
          const chatInfo = await this.bot.getChat(channelId);
          
          // Insert or update channel info
          await db.insert(channels)
            .values({
              channelId,
              name: chatInfo.title || channelId,
              description: chatInfo.description || null,
            })
            .onConflictDoUpdate({
              target: channels.channelId,
              set: {
                name: chatInfo.title || channelId,
                description: chatInfo.description || null,
              }
            });
          
          this.monitorChannel(channelId);
          await this.logSystem("info", `Started monitoring channel: ${chatInfo.title || channelId}`);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          await this.logSystem("error", `Failed to process channel: ${errorMessage}`);
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      await this.logSystem("error", `Failed to fetch channels: ${errorMessage}`);
    }
  }

  private async monitorChannel(channelId: string) {
    this.bot.on("message", async (msg) => {
      if (msg.chat.id.toString() !== channelId) return;

      try {
        if (msg.photo || msg.video) {
          const mediaType = msg.photo ? "photo" : "video";
          const fileId = msg.photo 
            ? msg.photo[msg.photo.length - 1].file_id 
            : msg.video!.file_id;

          const file = await this.bot.getFile(fileId);
          const filePath = await downloadMedia(file, this.mediaStoragePath);

          await db.insert(media).values({
            messageId: msg.message_id,
            channelId,
            type: mediaType,
            fileId,
            filePath,
            caption: msg.caption,
            metadata: msg.photo || msg.video,
          });

          await this.logSystem(
            "info", 
            `Downloaded ${mediaType} from channel ${channelId}`
          );
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        await this.logSystem(
          "error",
          `Failed to process media from channel ${channelId}: ${errorMessage}`
        );
      }
    });
  }

  private async logSystem(level: string, message: string, metadata?: any) {
    await db.insert(systemLogs).values({
      level,
      message,
      metadata,
    });
  }
}
