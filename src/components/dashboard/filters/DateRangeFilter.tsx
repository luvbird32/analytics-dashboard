
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { DashboardFilters } from '@/types/dashboard';

interface DateRangeFilterProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

/**
 * Date range filter component with presets and custom range
 */
export const DateRangeFilter = ({ filters, onFiltersChange }: DateRangeFilterProps) => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const handleDateRangeChange = (range: 'today' | '7d' | '30d' | '90d' | 'custom') => {
    onFiltersChange({ ...filters, dateRange: range });
  };

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Date Range</label>
      <div className="flex flex-wrap gap-2">
        {dateRangeOptions.map(({ value, label }) => (
          <Button
            key={value}
            variant={filters.dateRange === value ? "default" : "outline"}
            size="sm"
            onClick={() => handleDateRangeChange(value as any)}
          >
            {label}
          </Button>
        ))}
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={filters.dateRange === 'custom' ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-2"
            >
              <CalendarIcon className="h-4 w-4" />
              Custom Range
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium">From</label>
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  className="p-3 pointer-events-auto"
                />
              </div>
              <div>
                <label className="text-sm font-medium">To</label>
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  className="p-3 pointer-events-auto"
                />
              </div>
              <Button 
                size="sm" 
                onClick={() => handleDateRangeChange('custom')}
                disabled={!dateFrom || !dateTo}
              >
                Apply Custom Range
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
