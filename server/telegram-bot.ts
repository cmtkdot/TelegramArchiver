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
    this.bot = new TelegramBot(token, { polling: true });
    this.mediaStoragePath = path.join(process.cwd(), "media_storage");
    
    // Ensure media storage directory exists
    if (!fs.existsSync(this.mediaStoragePath)) {
      fs.mkdirSync(this.mediaStoragePath, { recursive: true });
    }
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
    const monitoredChannels = await db.select().from(channels);
    
    for (const channel of monitoredChannels) {
      try {
        const chat = await this.bot.getChat(channel.channelId);
        await db.update(channels)
          .set({ name: chat.title || channel.channelId })
          .where(eq(channels.channelId, channel.channelId));
          
        this.monitorChannel(channel.channelId);
      } catch (error) {
        await this.logSystem("error", `Failed to start monitoring channel: ${channel.channelId}`);
      }
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
        await this.logSystem(
          "error",
          `Failed to process media from channel ${channelId}`
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
