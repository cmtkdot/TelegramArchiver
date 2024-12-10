import React, { useState, useEffect } from 'react';
import { fetchChannelMedia, downloadAndSaveMedia, MediaItem } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pagination } from '@/components/ui/pagination';
import { MoreVertical, Download, Eye } from 'lucide-react';

interface MediaGalleryProps {
  channelId: number;
}

export function MediaGallery({ channelId }: MediaGalleryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedia();
  }, [channelId, page]);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const result = await fetchChannelMedia(channelId, page);
      setMedia(result.media);
      setTotalPages(Math.ceil(result.total / result.limit));
    } catch (error) {
      console.error('Error loading media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (mediaItem: MediaItem) => {
    try {
      const filename = `${mediaItem.mediaType}_${mediaItem.id}${getFileExtension(mediaItem.mediaType)}`;
      await downloadAndSaveMedia(mediaItem.id, filename);
    } catch (error) {
      console.error('Error downloading media:', error);
    }
  };

  const getFileExtension = (mediaType: string) => {
    switch (mediaType.toLowerCase()) {
      case 'photo':
        return '.jpg';
      case 'video':
        return '.mp4';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          media.map((item) => (
            <Card key={item.id} className="overflow-hidden bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <div className="relative aspect-video">
                {item.mediaType === 'photo' ? (
                  <img
                    src={item.downloadUrl}
                    alt={item.caption || `Media ${item.id}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={item.downloadUrl}
                    className="w-full h-full object-cover"
                    controls
                  />
                )}
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => handleDownload(item)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.open(item.downloadUrl, '_blank')}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Original
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                    {item.caption || `${item.mediaType} ${item.id}`}
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>{item.fileSize}</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
} 