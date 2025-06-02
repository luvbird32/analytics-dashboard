
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface DateRangeFilterProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

/**
 * Date range filter component for dashboard filtering
 */
export const DateRangeFilter = ({ selectedRange, onRangeChange }: DateRangeFilterProps) => {
  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' }
  ];

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Date Range</Label>
      <Select value={selectedRange} onValueChange={onRangeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select date range" />
        </SelectTrigger>
        <SelectContent>
          {dateRanges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
