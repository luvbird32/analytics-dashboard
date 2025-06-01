
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';
import { DashboardFilters as FilterType } from '@/types/dashboard';
import { FilterUtils } from '@/utils/filterUtils';
import { DateRangeFilter } from './filters/DateRangeFilter';
import { CategoryFilter } from './filters/CategoryFilter';
import { RegionFilter } from './filters/RegionFilter';
import { UserTypeFilter } from './filters/UserTypeFilter';
import { ExportOptions } from './filters/ExportOptions';

interface DashboardFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  onExport: (format: 'pdf' | 'excel' | 'csv' | 'png') => void;
}

/**
 * Main dashboard filters component with organized sub-filters
 */
export const DashboardFilters = ({ filters, onFiltersChange, onExport }: DashboardFiltersProps) => {
  const activeFilterCount = FilterUtils.getActiveFilterCount(filters);

  const clearAllFilters = () => {
    onFiltersChange(FilterUtils.clearAllFilters());
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Advanced Filters & Export
          {activeFilterCount > 0 && (
            <Badge variant="secondary">
              {activeFilterCount} active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <DateRangeFilter filters={filters} onFiltersChange={onFiltersChange} />
        <CategoryFilter filters={filters} onFiltersChange={onFiltersChange} />
        <RegionFilter filters={filters} onFiltersChange={onFiltersChange} />
        <UserTypeFilter filters={filters} onFiltersChange={onFiltersChange} />
        <ExportOptions onExport={onExport} />

        {activeFilterCount > 0 && (
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
