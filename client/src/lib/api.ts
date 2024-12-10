import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

// Storage Interfaces
export interface StorageConfig {
  provider: 's3' | 'google-drive';
  credentials: Record<string, string>;
  bucket?: string;
  path?: string;
}

export interface StorageStatus {
  database: {
    connected: boolean;
    mediaCount: number;
    totalSize: string;
    lastSync: Date | null;
  };
  objectStorage: {
    connected: boolean;
    provider: string;
    bucket: string;
    availableSpace: string;
    usedSpace: string;
    usagePercent: number;
  };
}

export interface StorageHealth {
  isHealthy: boolean;
  errors: string[];
  directories: {
    path: string;
    exists: boolean;
    writable: boolean;
  }[];
}

export interface FileInfo {
  key: string;
  type: string;
  filename: string;
  uploaded: string;
  localPath: string;
  downloadUrl: string;
  size: number;
  caption?: string;
}

export interface StorageStats {
  totalFiles: number;
  totalSize: number;
  fileTypes: Record<string, number>;
}

// Storage API Functions
export async function initializeStorage(config?: StorageConfig): Promise<StorageHealth> {
  const { data } = await api.post('/storage/init', config);
  return data;
}

export async function checkStorageHealth(): Promise<StorageHealth> {
  const { data } = await api.get('/storage/health');
  return data;
}

export async function uploadFile(file: File, caption?: string): Promise<FileInfo> {
  const formData = new FormData();
  formData.append('file', file);
  if (caption) {
    formData.append('caption', caption);
  }
  
  const { data } = await api.post('/storage/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
}

export async function downloadFile(key: string): Promise<Blob> {
  const { data } = await api.get(`/storage/download/${key}`, {
    responseType: 'blob'
  });
  return data;
}

export async function listFiles(): Promise<FileInfo[]> {
  const { data } = await api.get('/storage/files');
  return data;
}

export async function getFileInfo(key: string): Promise<FileInfo> {
  const { data } = await api.get(`/storage/files/${key}`);
  return data;
}

export async function deleteFile(key: string): Promise<void> {
  await api.delete(`/storage/files/${key}`);
}

export async function getStorageStats(): Promise<StorageStats> {
  const { data } = await api.get('/storage/stats');
  return data;
}

// Media Search Interfaces
export interface SearchFilters {
  query?: string;
  mediaTypes?: ('photo' | 'video' | 'document')[];
  startDate?: Date;
  endDate?: Date;
  tags?: string[];
  minSize?: number;
  maxSize?: number;
  channelIds?: number[];
}

export interface SearchResult {
  items: MediaItem[];
  total: number;
  page: number;
  pageSize: number;
}

// Media Search Functions
export async function searchMedia(
  filters: SearchFilters,
  page: number = 1,
  pageSize: number = 20
): Promise<SearchResult> {
  const { data } = await api.get('/media/search', {
    params: {
      ...filters,
      page,
      pageSize
    }
  });
  return data;
}

// Tag Management Interfaces
export interface Tag {
  id: string;
  name: string;
  color: string;
  count: number;
}

// Tag Management Functions
export async function listTags(): Promise<Tag[]> {
  const { data } = await api.get('/tags');
  return data;
}

export async function createTag(tag: Omit<Tag, 'id' | 'count'>): Promise<Tag> {
  const { data } = await api.post('/tags', tag);
  return data;
}

export async function updateTag(id: string, tag: Partial<Omit<Tag, 'id' | 'count'>>): Promise<Tag> {
  const { data } = await api.patch(`/tags/${id}`, tag);
  return data;
}

export async function deleteTag(id: string): Promise<void> {
  await api.delete(`/tags/${id}`);
}

// System Stats Interfaces
export interface SystemStats {
  storage: StorageStats;
  database: {
    totalRecords: number;
    lastBackup: Date | null;
    size: string;
  };
  system: {
    uptime: number;
    memory: {
      total: string;
      used: string;
      free: string;
    };
    cpu: {
      usage: number;
      cores: number;
    };
  };
}

// System Stats Functions
export async function fetchSystemStats(): Promise<SystemStats> {
  const { data } = await api.get('/system/stats');
  return data;
}

// Channel Management Interfaces
export interface Channel {
  id: string;
  name: string;
  type: 'telegram' | 'discord' | 'slack';
  status: 'active' | 'paused' | 'error';
  lastSync: Date | null;
  mediaCount: number;
  config: Record<string, any>;
}

// Channel Management Functions
export async function fetchChannels(): Promise<Channel[]> {
  const { data } = await api.get('/channels');
  return data;
}

export async function updateChannel(id: string, updates: Partial<Channel>): Promise<Channel> {
  const { data } = await api.patch(`/channels/${id}`, updates);
  return data;
}

export async function deleteChannel(id: string): Promise<void> {
  await api.delete(`/channels/${id}`);
}

// Error Handling
api.interceptors.response.use(
  response => response,
  error => {
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error);
      throw new Error('Network error occurred');
    }

    // Handle API errors
    const { status, data } = error.response;
    console.error(`API error ${status}:`, data);
    
    // Rethrow with more context
    throw new Error(data.error || 'An unknown error occurred');
  }
);

// Media Item Interface
export interface MediaItem {
  id: number;
  filename: string;
  mimeType: string;
  localPath: string;
  caption: string;
  downloadUrl: string;
  size: number;
  createdAt: Date;
  downloadedAt: Date;
  channelId?: number;
  tags?: string[];
}

// Add fetchChannelMedia function
export async function fetchChannelMedia(
  channelId: number,
  page: number = 1,
  pageSize: number = 20
): Promise<SearchResult> {
  const { data } = await api.get('/media', {
    params: {
      channelId,
      page,
      pageSize
    }
  });
  return data;
}
