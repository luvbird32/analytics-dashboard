
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
 * Performance metrics section with desktop-optimized layout
 */
export const MetricsSection = ({ 
  performanceMetrics, 
  filters, 
  onFiltersChange, 
  onExport 
}: MetricsSectionProps) => {
  return (
    <>
      {/* Desktop Layout - Filters Sidebar + Metrics Grid */}
      <div className="hidden lg:grid lg:grid-cols-5 xl:grid-cols-6 gap-6 lg:gap-8">
        <div className="lg:col-span-1 xl:col-span-1">
          <DashboardFilters
            filters={filters}
            onFiltersChange={onFiltersChange}
            onExport={onExport}
          />
        </div>
        
        <div className="lg:col-span-4 xl:col-span-5">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
                <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6" />
                Performance Metrics
                {filters.category.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    Filtered by {filters.category.length} categories
                  </Badge>
                )}
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
              {performanceMetrics.map((metric) => (
                <EnhancedMetricCard key={metric.id} metric={metric} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Performance Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {performanceMetrics.slice(0, 6).map((metric) => (
            <EnhancedMetricCard key={metric.id} metric={metric} />
          ))}
        </div>
        {performanceMetrics.length > 6 && (
          <div className="text-center">
            <Button variant="outline" size="sm">
              View All Metrics ({performanceMetrics.length - 6} more)
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
