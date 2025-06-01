
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { DashboardFilters as FilterType } from '@/types/dashboard';

interface DashboardFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  onExport: (format: 'pdf' | 'excel' | 'csv' | 'png') => void;
}

/**
 * Advanced dashboard filters with date range, categories, and export options
 */
export const DashboardFilters = ({ filters, onFiltersChange, onExport }: DashboardFiltersProps) => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const categories = [
    { id: 'revenue', label: 'Revenue' },
    { id: 'users', label: 'Users' },
    { id: 'performance', label: 'Performance' },
    { id: 'conversion', label: 'Conversion' }
  ];

  const regions = [
    { id: 'north-america', label: 'North America' },
    { id: 'europe', label: 'Europe' },
    { id: 'asia-pacific', label: 'Asia Pacific' },
    { id: 'latin-america', label: 'Latin America' }
  ];

  const userTypes = [
    { id: 'premium', label: 'Premium' },
    { id: 'standard', label: 'Standard' },
    { id: 'trial', label: 'Trial' }
  ];

  const handleDateRangeChange = (range: 'today' | '7d' | '30d' | '90d' | 'custom') => {
    onFiltersChange({ ...filters, dateRange: range });
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.category.includes(categoryId)
      ? filters.category.filter(id => id !== categoryId)
      : [...filters.category, categoryId];
    onFiltersChange({ ...filters, category: newCategories });
  };

  const handleRegionToggle = (regionId: string) => {
    const newRegions = filters.region.includes(regionId)
      ? filters.region.filter(id => id !== regionId)
      : [...filters.region, regionId];
    onFiltersChange({ ...filters, region: newRegions });
  };

  const handleUserTypeToggle = (userTypeId: string) => {
    const newUserTypes = filters.userType.includes(userTypeId)
      ? filters.userType.filter(id => id !== userTypeId)
      : [...filters.userType, userTypeId];
    onFiltersChange({ ...filters, userType: newUserTypes });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      dateRange: '30d',
      category: [],
      region: [],
      userType: []
    });
  };

  const getActiveFilterCount = () => {
    return filters.category.length + filters.region.length + filters.userType.length;
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Advanced Filters & Export
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary">
              {getActiveFilterCount()} active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Range Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Date Range</label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'today', label: 'Today' },
              { value: '7d', label: '7 Days' },
              { value: '30d', label: '30 Days' },
              { value: '90d', label: '90 Days' }
            ].map(({ value, label }) => (
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
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">To</label>
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      className={cn("p-3 pointer-events-auto")}
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

        {/* Category Filters */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={filters.category.includes(category.id)}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                />
                <label
                  htmlFor={category.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Region Filters */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Regions</label>
          <div className="grid grid-cols-2 gap-2">
            {regions.map(region => (
              <div key={region.id} className="flex items-center space-x-2">
                <Checkbox
                  id={region.id}
                  checked={filters.region.includes(region.id)}
                  onCheckedChange={() => handleRegionToggle(region.id)}
                />
                <label
                  htmlFor={region.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {region.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* User Type Filters */}
        <div className="space-y-2">
          <label className="text-sm font-medium">User Types</label>
          <div className="flex flex-wrap gap-2">
            {userTypes.map(userType => (
              <div key={userType.id} className="flex items-center space-x-2">
                <Checkbox
                  id={userType.id}
                  checked={filters.userType.includes(userType.id)}
                  onCheckedChange={() => handleUserTypeToggle(userType.id)}
                />
                <label
                  htmlFor={userType.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {userType.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Export Data</label>
          <div className="flex flex-wrap gap-2">
            {[
              { format: 'pdf', label: 'PDF Report' },
              { format: 'excel', label: 'Excel' },
              { format: 'csv', label: 'CSV' },
              { format: 'png', label: 'PNG Charts' }
            ].map(({ format, label }) => (
              <Button
                key={format}
                variant="outline"
                size="sm"
                onClick={() => onExport(format as any)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {getActiveFilterCount() > 0 && (
          <div className="pt-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Clear All Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
