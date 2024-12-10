import React, { useState, useEffect } from 'react';
import { SearchFilters } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface SearchAndFilterProps {
  onFiltersChange: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
}

export function SearchAndFilter({ onFiltersChange, initialFilters }: SearchAndFilterProps) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters || {});
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, 100]);

  const mediaTypes = [
    { value: 'photo', label: 'Photos' },
    { value: 'video', label: 'Videos' },
    { value: 'document', label: 'Documents' }
  ];

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleMediaTypeChange = (type: string, checked: boolean) => {
    setFilters(prev => {
      const mediaTypes = prev.mediaTypes || [];
      if (checked) {
        return { ...prev, mediaTypes: [...mediaTypes, type as 'photo' | 'video' | 'document'] };
      } else {
        return { ...prev, mediaTypes: mediaTypes.filter(t => t !== type) };
      }
    });
  };

  const handleSizeRangeChange = (values: number[]) => {
    setSizeRange([values[0], values[1]]);
    setFilters(prev => ({
      ...prev,
      minSize: values[0] * 1024 * 1024, // Convert MB to bytes
      maxSize: values[1] * 1024 * 1024
    }));
  };

  const handleReset = () => {
    setFilters({});
    setSizeRange([0, 100]);
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Search Query */}
        <div className="space-y-2">
          <Label>Search</Label>
          <Input
            type="text"
            placeholder="Search media..."
            value={filters.query || ''}
            onChange={e => setFilters(prev => ({ ...prev, query: e.target.value }))}
          />
        </div>

        {/* Media Types */}
        <div className="space-y-2">
          <Label>Media Types</Label>
          <div className="flex flex-wrap gap-4">
            {mediaTypes.map(type => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={type.value}
                  checked={filters.mediaTypes?.includes(type.value as any)}
                  onCheckedChange={checked => handleMediaTypeChange(type.value, !!checked)}
                />
                <label
                  htmlFor={type.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <DatePicker
              date={filters.startDate}
              onSelect={date => setFilters(prev => ({ ...prev, startDate: date }))}
            />
          </div>
          <div className="space-y-2">
            <Label>End Date</Label>
            <DatePicker
              date={filters.endDate}
              onSelect={date => setFilters(prev => ({ ...prev, endDate: date }))}
            />
          </div>
        </div>

        {/* Size Range */}
        <div className="space-y-2">
          <Label>File Size Range (MB)</Label>
          <Slider
            value={sizeRange}
            min={0}
            max={100}
            step={1}
            onValueChange={handleSizeRangeChange}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{sizeRange[0]} MB</span>
            <span>{sizeRange[1]} MB</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleReset}>
            Reset Filters
          </Button>
          <Button onClick={() => onFiltersChange(filters)}>
            Apply Filters
          </Button>
        </div>
      </div>
    </Card>
  );
} 