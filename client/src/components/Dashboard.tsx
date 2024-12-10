import React, { useState, useEffect } from 'react';
import { fetchChannels, fetchSystemStats, searchMedia, Channel, SystemStats, SearchFilters } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { MediaGallery } from './MediaGallery';
import { StorageDiagnostic } from './StorageDiagnostic';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Dashboard() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<number | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [channelsData, statsData] = await Promise.all([
        fetchChannels(),
        fetchSystemStats()
      ]);

      setChannels(channelsData);
      setStats(statsData);
      if (channelsData.length > 0 && !selectedChannel) {
        setSelectedChannel(Number(channelsData[0].id));
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    }
  };

  const formatStorageSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Storage</h3>
          {stats && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Files</span>
                <span className="font-medium">{stats.storage.totalFiles}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Size</span>
                <span className="font-medium">{formatStorageSize(stats.storage.totalSize)}</span>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Database</h3>
          {stats && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Records</span>
                <span className="font-medium">{stats.database.totalRecords}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Size</span>
                <span className="font-medium">{stats.database.size}</span>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">System</h3>
          {stats && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">CPU Usage</span>
                <span className="font-medium">{stats.system.cpu.usage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Memory Used</span>
                <span className="font-medium">{stats.system.memory.used}</span>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Storage Diagnostic */}
      <StorageDiagnostic />

      {/* Media Management */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Media</TabsTrigger>
          {channels.map(channel => (
            <TabsTrigger
              key={channel.id}
              value={channel.id}
              onClick={() => setSelectedChannel(Number(channel.id))}
            >
              {channel.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <MediaGallery filters={searchFilters} />
        </TabsContent>

        {channels.map(channel => (
          <TabsContent key={channel.id} value={channel.id}>
            <MediaGallery
              channelId={Number(channel.id)}
              filters={searchFilters}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 