import React, { useState, useEffect } from 'react';
import { fetchChannelMedia, searchMedia, MediaItem, SearchFilters } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pagination } from '@/components/ui/pagination';
import { Download, MoreVertical, Eye, Tag, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export interface MediaGalleryProps {
  channelId: number;
  filters?: SearchFilters;
  onMediaSelect?: (media: MediaItem) => void;
  onBulkSelect?: (media: MediaItem[]) => void;
}

export function MediaGallery({ 
  channelId, 
  filters, 
  onMediaSelect,
  onBulkSelect 
}: MediaGalleryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<number>>(new Set());

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    loadMedia();
  }, [channelId, filters, page]);

  const loadMedia = async () => {
    try {
      setLoading(true);
      let result;
      if (filters && Object.keys(filters).length > 0) {
        result = await searchMedia({ ...filters, channelIds: [channelId] }, page, ITEMS_PER_PAGE);
      } else {
        result = await fetchChannelMedia(channelId, page, ITEMS_PER_PAGE);
      }
      setMedia(result.media);
      setTotalPages(Math.ceil(result.total / ITEMS_PER_PAGE));
    } catch (error) {
      console.error('Error loading media:', error);
      toast({
        title: 'Error',
        description: 'Failed to load media',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMediaClick = (mediaItem: MediaItem, event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      // Handle multi-select
      const newSelectedItems = new Set(selectedItems);
      if (newSelectedItems.has(mediaItem.id)) {
        newSelectedItems.delete(mediaItem.id);
      } else {
        newSelectedItems.add(mediaItem.id);
      }
      setSelectedItems(newSelectedItems);
      onBulkSelect?.(media.filter(m => newSelectedItems.has(m.id)));
    } else {
      // Handle single select
      setSelectedId(mediaItem.id);
      onMediaSelect?.(mediaItem);
      setSelectedItems(new Set([mediaItem.id]));
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.size === media.length) {
      setSelectedItems(new Set());
      onBulkSelect?.([]);
    } else {
      const allIds = new Set(media.map(m => m.id));
      setSelectedItems(allIds);
      onBulkSelect?.(media);
    }
  };

  const handleDownload = async (mediaItem: MediaItem) => {
    try {
      const response = await fetch(mediaItem.downloadUrl!);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${mediaItem.mediaType}_${mediaItem.id}${getFileExtension(mediaItem.mediaType)}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: 'Success',
        description: 'File downloaded successfully',
      });
    } catch (error) {
      console.error('Error downloading media:', error);
      toast({
        title: 'Error',
        description: 'Failed to download file',
        variant: 'destructive',
      });
    }
  };

  const handleImageError = (mediaId: number) => {
    setImageLoadErrors(prev => new Set(prev).add(mediaId));
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

  if (loading) {
    return (
      <div className="grid place-items-center h-64">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-[#3c75ef]" />
          <span>Loading media...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {media.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedItems.size === media.length}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-sm text-gray-600">
              {selectedItems.size} selected
            </span>
          </div>
          {selectedItems.size > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const selectedMedia = media.filter(m => selectedItems.has(m.id));
                Promise.all(selectedMedia.map(handleDownload));
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Selected
            </Button>
          )}
        </div>
      )}

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item) => (
          <Card
            key={item.id}
            className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
              selectedItems.has(item.id) ? 'ring-2 ring-[#3c75ef]' : ''
            }`}
            onClick={(e) => handleMediaClick(item, e)}
          >
            <div className="relative aspect-video">
              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <Checkbox
                  checked={selectedItems.has(item.id)}
                  onCheckedChange={(checked) => {
                    const newSelectedItems = new Set(selectedItems);
                    if (checked) {
                      newSelectedItems.add(item.id);
                    } else {
                      newSelectedItems.delete(item.id);
                    }
                    setSelectedItems(newSelectedItems);
                    onBulkSelect?.(media.filter(m => newSelectedItems.has(m.id)));
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Media Preview */}
              {item.mediaType === 'photo' ? (
                imageLoadErrors.has(item.id) ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-sm text-gray-500">Image not available</span>
                  </div>
                ) : (
                  <img
                    src={item.downloadUrl}
                    alt={item.caption || `Media ${item.id}`}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(item.id)}
                  />
                )
              ) : (
                <video
                  src={item.downloadUrl}
                  className="w-full h-full object-cover"
                  controls
                  onError={() => handleImageError(item.id)}
                />
              )}

              {/* Actions Dropdown */}
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(item);
                    }}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      window.open(item.downloadUrl, '_blank');
                    }}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Original
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Media Info */}
            <div className="p-4">
              <div className="space-y-2">
                <div className="text-sm font-medium line-clamp-2">
                  {item.caption || `${item.mediaType} ${item.id}`}
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{item.fileSize}</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[#3c75ef]/10 text-[#3c75ef]"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}

        {media.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No media found
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
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