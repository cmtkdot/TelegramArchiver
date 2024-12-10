import React, { useState, useEffect } from 'react';
import { SearchFilters, listTags } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, Calendar as CalendarIcon, Tag, Filter } from 'lucide-react';

interface SearchAndFilterProps {
  onFiltersChange: (filters: SearchFilters) => void;
}

export function SearchAndFilter({ onFiltersChange }: SearchAndFilterProps) {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [availableTags, setAvailableTags] = useState<Array<{ tag: string; count: number }>>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      const tags = await listTags();
      setAvailableTags(tags);
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  };

  const handleSearchChange = (query: string) => {
    setFilters(prev => ({ ...prev, query }));
  };

  const handleMediaTypeToggle = (type: 'photo' | 'video' | 'document') => {
    setFilters(prev => {
      const mediaTypes = prev.mediaTypes || [];
      const updated = mediaTypes.includes(type)
        ? mediaTypes.filter(t => t !== type)
        : [...mediaTypes, type];
      return { ...prev, mediaTypes: updated };
    });
  };

  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    if (start && end) {
      setFilters(prev => ({ ...prev, dateRange: { start, end } }));
    }
  };

  const handleFileSizeChange = (range: [number, number]) => {
    setFilters(prev => ({
      ...prev,
      fileSizeRange: { min: range[0], max: range[1] }
    }));
  };

  const handleTagToggle = (tag: string) => {
    setFilters(prev => {
      const tags = prev.tags || [];
      const updated = tags.includes(tag)
        ? tags.filter(t => t !== tag)
        : [...tags, tag];
      return { ...prev, tags: updated };
    });
  };

  const applyFilters = () => {
    onFiltersChange(filters);
  };

  const resetFilters = () => {
    setFilters({});
    onFiltersChange({});
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Search media..."
              value={filters.query || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {/* Media Types */}
              <div className="space-y-2">
                <Label>Media Types</Label>
                <div className="flex gap-4">
                  {(['photo', 'video', 'document'] as const).map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.mediaTypes?.includes(type)}
                        onCheckedChange={() => handleMediaTypeToggle(type)}
                      />
                      <Label htmlFor={`type-${type}`} className="capitalize">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <Label>Date Range</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {filters.dateRange
                        ? `${filters.dateRange.start.toLocaleDateString()} - ${filters.dateRange.end.toLocaleDateString()}`
                        : 'Select dates'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={{
                        from: filters.dateRange?.start,
                        to: filters.dateRange?.end
                      }}
                      onSelect={(range) => {
                        if (range?.from && range?.to) {
                          handleDateRangeChange(range.from, range.to);
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* File Size Range */}
              <div className="space-y-2">
                <Label>File Size (MB)</Label>
                <Slider
                  min={0}
                  max={1000}
                  step={1}
                  value={[
                    filters.fileSizeRange?.min || 0,
                    filters.fileSizeRange?.max || 1000
                  ]}
                  onValueChange={handleFileSizeChange}
                />
                <div className="text-sm text-gray-500">
                  {filters.fileSizeRange?.min || 0}MB - {filters.fileSizeRange?.max || 1000}MB
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2 col-span-full">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(({ tag, count }) => (
                    <Badge
                      key={tag}
                      variant={filters.tags?.includes(tag) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag} ({count})
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="col-span-full flex justify-end gap-2">
                <Button variant="outline" onClick={resetFilters}>
                  Reset
                </Button>
                <Button onClick={applyFilters} className="bg-[#3c75ef]">
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 