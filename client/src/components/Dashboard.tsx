import React, { useState, useEffect } from 'react';
import { fetchChannels, fetchSystemStats, ChannelWithStats, SystemStats } from '@/lib/api';
import { MediaGallery } from './MediaGallery';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Database, Image, Video, HardDrive } from 'lucide-react';

export function Dashboard() {
  const [channels, setChannels] = useState<ChannelWithStats[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [channelsData, statsData] = await Promise.all([
        fetchChannels(),
        fetchSystemStats()
      ]);
      setChannels(channelsData);
      setStats(statsData);
      if (channelsData.length > 0 && !selectedChannel) {
        setSelectedChannel(channelsData[0].id);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-[#3c75ef]/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#3c75ef]">
                  Total Channels
                </CardTitle>
                <Database className="h-4 w-4 text-[#3c75ef]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#3c75ef]">
                  {stats.channels}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#2e85ff]/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#2e85ff]">
                  Media Items
                </CardTitle>
                <Image className="h-4 w-4 text-[#2e85ff]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#2e85ff]">
                  {stats.mediaItems}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#6998ff]/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#6998ff]">
                  Storage Used
                </CardTitle>
                <HardDrive className="h-4 w-4 text-[#6998ff]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#6998ff]">
                  {stats.totalSize}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#8fabff]/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#8fabff]">
                  Status
                </CardTitle>
                <div className={`h-2 w-2 rounded-full ${
                  stats.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                }`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#8fabff] capitalize">
                  {stats.status}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Channels Sidebar */}
          <Card className="col-span-12 lg:col-span-3">
            <CardHeader>
              <CardTitle>Channels</CardTitle>
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="space-y-1 p-2">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedChannel === channel.id
                        ? 'bg-[#3c75ef] text-white'
                        : 'hover:bg-[#3c75ef]/10'
                    }`}
                  >
                    <div className="font-medium">{channel.title}</div>
                    <div className="text-xs opacity-70">
                      {channel.mediaCount} items • {channel.totalSize}
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Media Gallery */}
          <div className="col-span-12 lg:col-span-9">
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedChannel
                    ? channels.find(c => c.id === selectedChannel)?.title
                    : 'Select a Channel'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedChannel && (
                  <MediaGallery channelId={selectedChannel} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 