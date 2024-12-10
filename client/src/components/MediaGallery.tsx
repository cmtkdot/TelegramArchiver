import React, { useState, useEffect } from 'react';
import { fetchChannelMedia, searchMedia, MediaItem, SearchFilters } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Pagination } from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 20;

interface MediaGalleryProps {
  channelId?: number;
  filters?: SearchFilters;
}

export function MediaGallery({ channelId, filters }: MediaGalleryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    loadMedia();
  }, [channelId, filters, page]);

  const loadMedia = async () => {
    try {
      setIsLoading(true);
      let result;
      if (filters && Object.keys(filters).length > 0) {
        result = await searchMedia({ ...filters, channelIds: channelId ? [channelId] : undefined }, page, ITEMS_PER_PAGE);
      } else if (channelId) {
        result = await fetchChannelMedia(channelId, page, ITEMS_PER_PAGE);
      } else {
        result = await searchMedia({}, page, ITEMS_PER_PAGE);
      }
      setMedia(result.items);
      setTotalPages(Math.ceil(result.total / ITEMS_PER_PAGE));
    } catch (error) {
      console.error('Error loading media:', error);
      toast({
        title: 'Error',
        description: 'Failed to load media items',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = (id: number) => {
    setImageLoadErrors(prev => new Set(Array.from(prev).concat(id)));
  };

  const handleSelect = (id: number) => {
    setSelectedItems(prev => {
      const newSet = new Set(Array.from(prev));
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.size === media.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(media.map(item => item.id)));
    }
  };

  const handleDownload = async (mediaItem: MediaItem) => {
    try {
      const response = await fetch(mediaItem.downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${mediaItem.filename}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: 'Download Failed',
        description: 'Failed to download the file',
        variant: 'destructive',
      });
    }
  };

  const handleBulkDownload = async () => {
    try {
      const selectedMedia = media.filter(item => selectedItems.has(item.id));
      await Promise.all(selectedMedia.map(handleDownload));
      toast({
        title: 'Success',
        description: 'All selected files downloaded successfully',
      });
    } catch (error) {
      console.error('Error in bulk download:', error);
      toast({
        title: 'Download Failed',
        description: 'Failed to download some files',
        variant: 'destructive',
      });
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return '🖼️';
    if (mimeType.startsWith('video/')) return '🎥';
    if (mimeType.startsWith('audio/')) return '🎵';
    return '📄';
  };

  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={selectedItems.size === media.length && media.length > 0}
            onCheckedChange={handleSelectAll}
          />
          <span className="text-sm text-gray-500">
            {selectedItems.size} selected
          </span>
        </div>
        {selectedItems.size > 0 && (
          <Button onClick={handleBulkDownload}>
            Download Selected
          </Button>
        )}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {media.map(item => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <div className="absolute top-2 left-2 z-10">
                <Checkbox
                  checked={selectedItems.has(item.id)}
                  onCheckedChange={() => handleSelect(item.id)}
                />
              </div>

              {/* Media Preview */}
              {item.mimeType.startsWith('image/') ? (
                imageLoadErrors.has(item.id) ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-sm text-gray-500">Image not available</span>
                  </div>
                ) : (
                  <img
                    src={item.downloadUrl}
                    alt={item.caption || item.filename}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(item.id)}
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-4xl">{getFileIcon(item.mimeType)}</span>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="space-y-2">
                <div className="text-sm font-medium line-clamp-2">
                  {item.caption || item.filename}
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{formatFileSize(item.size)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(item)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
} 