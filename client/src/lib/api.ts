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
  tags: string[];
  fileMetadata: Record<string, any> | null;
  searchVector: string | null;
}

// Extend the base media type with frontend-specific fields
export interface MediaItem extends Omit<BaseMedia, 'fileSize' | 'mediaType' | 'createdAt' | 'fileMetadata' | 'searchVector'> {
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

export interface SearchFilters {
  query?: string;
  mediaTypes?: ('photo' | 'video' | 'document')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  fileSizeRange?: {
    min: number;
    max: number;
  };
  tags?: string[];
  channelIds?: number[];
}

export interface ExportOptions {
  format: 'zip' | 'csv';
  filters?: SearchFilters;
  includeMetadata?: boolean;
}

export interface ApiKeyConfig {
  name: string;
  scopes: string[];
  expiresIn?: number;
}

export interface StorageConfig {
  provider: 's3' | 'google-drive';
  credentials: Record<string, string>;
  bucket?: string;
  path?: string;
}

// Helper function to map media response
function mapMediaResponse(item: any): MediaItem {
  return {
    id: item.id,
    channelId: item.channel_id,
    messageId: item.message_id,
    fileId: item.file_id,
    filename: item.filename,
    mimeType: item.mime_type,
    localPath: item.local_path,
    downloadedAt: item.downloaded_at ? new Date(item.downloaded_at) : null,
    caption: item.caption,
    createdAt: new Date(item.created_at),
    mediaType: item.media_type,
    fileSize: item.file_size,
    downloadUrl: item.id ? `/api/media/${item.id}/download` : undefined,
    tags: item.tags || []
  };
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

// Advanced search function
export async function searchMedia(
  filters: SearchFilters,
  page = 1,
  limit = 20
): Promise<{ media: MediaItem[]; total: number; page: number; limit: number }> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(filters.query && { query: filters.query }),
    ...(filters.mediaTypes && { mediaTypes: filters.mediaTypes.join(',') }),
    ...(filters.dateRange && {
      dateStart: filters.dateRange.start.toISOString(),
      dateEnd: filters.dateRange.end.toISOString()
    }),
    ...(filters.fileSizeRange && {
      sizeMin: filters.fileSizeRange.min.toString(),
      sizeMax: filters.fileSizeRange.max.toString()
    }),
    ...(filters.tags && { tags: filters.tags.join(',') }),
    ...(filters.channelIds && { channels: filters.channelIds.join(',') })
  });

  const res = await fetch(`${API_BASE}/media/search?${queryParams}`);
  if (!res.ok) throw new Error("Failed to search media");
  const data = await res.json();
  return {
    ...data,
    media: data.media.map(mapMediaResponse)
  };
}

// Export media and metadata
export async function exportMedia(options: ExportOptions): Promise<Blob> {
  const res = await fetch(`${API_BASE}/media/export`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options)
  });
  if (!res.ok) throw new Error("Failed to export media");
  return res.blob();
}

// Manage API keys
export async function createApiKey(config: ApiKeyConfig): Promise<{ key: string; id: string }> {
  const res = await fetch(`${API_BASE}/api-keys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  });
  if (!res.ok) throw new Error("Failed to create API key");
  return res.json();
}

export async function listApiKeys(): Promise<Array<{ id: string; name: string; scopes: string[]; createdAt: Date; expiresAt: Date | null }>> {
  const res = await fetch(`${API_BASE}/api-keys`);
  if (!res.ok) throw new Error("Failed to list API keys");
  const data = await res.json();
  return data.map((key: any) => ({
    ...key,
    createdAt: new Date(key.created_at),
    expiresAt: key.expires_at ? new Date(key.expires_at) : null
  }));
}

export async function revokeApiKey(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api-keys/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error("Failed to revoke API key");
}

// Configure cloud storage
export async function configureStorage(config: StorageConfig): Promise<void> {
  const res = await fetch(`${API_BASE}/storage/configure`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  });
  if (!res.ok) throw new Error("Failed to configure storage");
}

// Tag management
export async function addTags(mediaId: number, tags: string[]): Promise<void> {
  const res = await fetch(`${API_BASE}/media/${mediaId}/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tags })
  });
  if (!res.ok) throw new Error("Failed to add tags");
}

export async function removeTags(mediaId: number, tags: string[]): Promise<void> {
  const res = await fetch(`${API_BASE}/media/${mediaId}/tags`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tags })
  });
  if (!res.ok) throw new Error("Failed to remove tags");
}

export async function listTags(): Promise<Array<{ tag: string; count: number }>> {
  const res = await fetch(`${API_BASE}/tags`);
  if (!res.ok) throw new Error("Failed to list tags");
  return res.json();
}

// Fetch channel media with pagination
export async function fetchChannelMedia(
  channelId: number,
  page = 1,
  limit = 20
): Promise<{ media: MediaItem[]; total: number; page: number; limit: number }> {
  const res = await fetch(
    `${API_BASE}/channels/${channelId}/media?page=${page}&limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch channel media");
  const data = await res.json();
  return {
    ...data,
    media: data.media.map(mapMediaResponse)
  };
}
