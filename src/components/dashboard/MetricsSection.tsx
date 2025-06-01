
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import { EnhancedMetricCard } from './EnhancedMetricCard';
import { DashboardFilters } from './DashboardFilters';
import { PerformanceMetric, DashboardFilters as FilterType } from '@/types/dashboard';

interface MetricsSectionProps {
  performanceMetrics: PerformanceMetric[];
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  onExport: (format: 'pdf' | 'excel' | 'csv' | 'png') => void;
}

/**
 * Performance metrics section with desktop filters and responsive grid
 */
export const MetricsSection = ({ 
  performanceMetrics, 
  filters, 
  onFiltersChange, 
  onExport 
}: MetricsSectionProps) => {
  return (
    <>
      {/* Desktop Filters & Metrics Grid */}
      <div className="hidden sm:grid sm:grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-1">
          <DashboardFilters
            filters={filters}
            onFiltersChange={onFiltersChange}
            onExport={onExport}
          />
        </div>
        
        <div className="xl:col-span-3">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Metrics
              {filters.category.length > 0 && (
                <Badge variant="secondary">
                  Filtered by {filters.category.length} categories
                </Badge>
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {performanceMetrics.map((metric) => (
                <EnhancedMetricCard key={metric.id} metric={metric} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Metrics Grid */}
      <div className="sm:hidden space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Performance Metrics
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {performanceMetrics.slice(0, 4).map((metric) => (
            <EnhancedMetricCard key={metric.id} metric={metric} />
          ))}
        </div>
        {performanceMetrics.length > 4 && (
          <div className="text-center">
            <Button variant="outline" size="sm">
              View All Metrics ({performanceMetrics.length - 4} more)
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
