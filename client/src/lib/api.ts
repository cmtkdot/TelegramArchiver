import { Channel, Media, SystemLog } from "@db/schema";

const API_BASE = "/api";

export interface ChannelWithStats extends Channel {
  mediaCount: number;
  lastMediaAt: Date | null;
  lastChecked: Date | null;
}

export async function fetchChannels(): Promise<ChannelWithStats[]> {
  const res = await fetch(`${API_BASE}/channels`);
  if (!res.ok) throw new Error("Failed to fetch channels");
  return res.json();
}

export async function addChannel(link: string): Promise<Channel> {
  const res = await fetch(`${API_BASE}/channels`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ link }),
  });
  if (!res.ok) throw new Error("Failed to add channel");
  return res.json();
}

interface MediaWithUrl extends Media {
  signedUrl?: string;
}

export async function fetchMedia(
  channelId?: string,
  page = 1,
  limit = 20
): Promise<{ media: MediaWithUrl[]; total: number }> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(channelId && { channelId }),
  });
  
  const res = await fetch(`${API_BASE}/media?${params}`);
  if (!res.ok) throw new Error("Failed to fetch media");
  return res.json();
}

export async function fetchSystemLogs(
  limit = 100
): Promise<SystemLog[]> {
  const res = await fetch(`${API_BASE}/logs?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch logs");
  return res.json();
}
