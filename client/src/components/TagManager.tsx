import React, { useState, useEffect } from 'react';
import { addTags, removeTags, listTags } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Tag, Plus, X } from 'lucide-react';

interface TagManagerProps {
  mediaId?: number;
  initialTags?: string[];
  onTagsChange?: (tags: string[]) => void;
}

export function TagManager({ mediaId, initialTags = [], onTagsChange }: TagManagerProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState('');
  const [popularTags, setPopularTags] = useState<Array<{ tag: string; count: number }>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPopularTags();
  }, []);

  const loadPopularTags = async () => {
    try {
      const tagList = await listTags();
      setPopularTags(tagList);
    } catch (error) {
      console.error('Error loading tags:', error);
      toast({
        title: 'Error',
        description: 'Failed to load tags',
        variant: 'destructive',
      });
    }
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) return;
    
    try {
      setLoading(true);
      if (mediaId) {
        await addTags(mediaId, [newTag]);
      }
      
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      onTagsChange?.(updatedTags);
      setNewTag('');
      await loadPopularTags(); // Refresh popular tags
      
      toast({
        title: 'Success',
        description: 'Tag added successfully',
      });
    } catch (error) {
      console.error('Error adding tag:', error);
      toast({
        title: 'Error',
        description: 'Failed to add tag',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTag = async (tagToRemove: string) => {
    try {
      setLoading(true);
      if (mediaId) {
        await removeTags(mediaId, [tagToRemove]);
      }
      
      const updatedTags = tags.filter(tag => tag !== tagToRemove);
      setTags(updatedTags);
      onTagsChange?.(updatedTags);
      await loadPopularTags(); // Refresh popular tags
      
      toast({
        title: 'Success',
        description: 'Tag removed successfully',
      });
    } catch (error) {
      console.error('Error removing tag:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove tag',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Tag Manager
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add new tag */}
          <div className="flex gap-2">
            <Input
              placeholder="Add new tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="flex-1"
            />
            <Button
              onClick={handleAddTag}
              disabled={loading || !newTag.trim()}
              className="bg-[#3c75ef]"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Current tags */}
          <div>
            <h4 className="text-sm font-medium mb-2">Current Tags</h4>
            <div className="flex flex-wrap gap-2">
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1 bg-[#3c75ef]/10 text-[#3c75ef]"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-500"
                      disabled={loading}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-gray-500">No tags added yet</span>
              )}
            </div>
          </div>

          {/* Popular tags */}
          <div>
            <h4 className="text-sm font-medium mb-2">Popular Tags</h4>
            <div className="flex flex-wrap gap-2">
              {popularTags.map(({ tag, count }) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-[#3c75ef]/10"
                  onClick={() => !tags.includes(tag) && handleAddTag()}
                >
                  {tag} ({count})
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 