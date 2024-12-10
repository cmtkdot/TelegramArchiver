import { Channel, Media, SystemLog } from "@db/schema";

const API_BASE = "/api";

// Define the base Channel type from schema
interface BaseChannel {
  id: number;
  link: string;
  title: string | null;
  isActive: boolean | null;
  addedBy: number | null;
  addedAt: Date | null;
  lastChecked: Date | null;
  totalSize: number | null;
  mediaCount: number | null;
  status: string | null;
}

// Extend the base channel type with frontend-specific fields
export interface ChannelWithStats extends Omit<BaseChannel, 'isActive' | 'addedAt' | 'lastChecked' | 'totalSize' | 'mediaCount'> {
  mediaCount: number;
  totalSize: string;
  isActive: boolean;
  addedAt: Date;
  lastChecked: Date;
}

// Define the base Media type from schema
interface BaseMedia {
  id: number;
  createdAt: Date | null;
  channelId: number | null;
  fileId: string;
  messageId: number | null;
  mediaType: string | null;
  filename: string | null;
  fileSize: number | null;
  mimeType: string | null;
  localPath: string | null;
  caption: string | null;
  downloadedAt: Date | null;
}

// Extend the base media type with frontend-specific fields
export interface MediaItem extends Omit<BaseMedia, 'fileSize' | 'mediaType' | 'createdAt'> {
  mediaType: string;
  fileSize: string;
  createdAt: Date;
  downloadUrl?: string;
}

export interface WebhookConfig {
  url: string;
  events: string[];
  headers?: Record<string, string>;
}

export interface SystemStats {
  channels: number;
  mediaItems: number;
  totalSize: string;
  status: string;
}

// Fetch all channels with their statistics
export async function fetchChannels(): Promise<ChannelWithStats[]> {
  const res = await fetch(`${API_BASE}/channels`);
  if (!res.ok) throw new Error("Failed to fetch channels");
  const data = await res.json();
  return data.map((channel: any) => ({
    id: channel.id,
    link: channel.link,
    title: channel.title,
    addedBy: channel.added_by,
    status: channel.status,
    addedAt: new Date(channel.added_at),
    lastChecked: new Date(channel.last_checked),
    mediaCount: channel.media_count,
    totalSize: channel.total_size,
    isActive: channel.is_active
  }));
}

// Add a new channel
export async function addChannel(link: string): Promise<ChannelWithStats> {
  const res = await fetch(`${API_BASE}/channels`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ link })
  });
  if (!res.ok) throw new Error("Failed to add channel");
  return res.json();
}

// Fetch media with pagination
export async function fetchMedia(
  channelId?: string,
  page: number = 1,
  limit: number = 20
): Promise<{ media: MediaItem[]; total: number; page: number; limit: number }> {
  const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
  if (channelId) params.append('channelId', channelId);
  
  const res = await fetch(`${API_BASE}/media?${params}`);
  if (!res.ok) throw new Error("Failed to fetch media");
  const data = await res.json();
  return {
    ...data,
    media: data.media.map((item: any) => ({
      id: item.id,
      channelId: item.channelId,
      messageId: item.messageId,
      fileId: item.fileId,
      filename: item.filename,
      mimeType: item.mimeType,
      localPath: item.localPath,
      downloadedAt: item.downloadedAt ? new Date(item.downloadedAt) : null,
      caption: item.caption,
      createdAt: new Date(item.createdAt),
      mediaType: item.mediaType,
      fileSize: item.fileSize,
      downloadUrl: item.downloadUrl
    }))
  };
}

// Download media file
export async function downloadMedia(mediaId: number): Promise<Blob> {
  const res = await fetch(`${API_BASE}/media/${mediaId}/download`);
  if (!res.ok) throw new Error("Failed to download media");
  return res.blob();
}

// Configure webhook
export async function configureWebhook(config: WebhookConfig): Promise<{ id: number }> {
  const res = await fetch(`${API_BASE}/webhooks/configure`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
  });
  if (!res.ok) throw new Error("Failed to configure webhook");
  return res.json();
}

// Get system statistics
export async function fetchSystemStats(): Promise<SystemStats> {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error("Failed to fetch system stats");
  return res.json();
}

// Helper function to download and save file
export async function downloadAndSaveMedia(mediaId: number, filename: string): Promise<void> {
  try {
    const blob = await downloadMedia(mediaId);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading media:', error);
    throw error;
  }
}

// Fetch system logs with limit
export async function fetchSystemLogs(
  limit = 100
): Promise<SystemLog[]> {
  const res = await fetch(`${API_BASE}/logs?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch logs");
  const data = await res.json();
  return data.map((log: any) => ({
    ...log,
    createdAt: new Date(log.createdAt)
  }));
}
