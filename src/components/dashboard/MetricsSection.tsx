
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

// Default mock metrics in case data is missing
const defaultMetrics: PerformanceMetric[] = [
  {
    id: 'revenue-default',
    title: 'Total Revenue',
    value: 75420,
    unit: '$',
    change: 15.2,
    trend: 'up' as const,
    category: 'revenue' as const,
    priority: 'high' as const,
    target: 80000
  },
  {
    id: 'users-default',
    title: 'Active Users',
    value: 4872,
    unit: '',
    change: 8.7,
    trend: 'up' as const,
    category: 'users' as const,
    priority: 'high' as const,
    target: 5000
  },
  {
    id: 'orders-default',
    title: 'Monthly Orders',
    value: 1847,
    unit: '',
    change: 12.3,
    trend: 'up' as const,
    category: 'revenue' as const,
    priority: 'medium' as const,
    target: 2000
  },
  {
    id: 'conversion-default',
    title: 'Conversion Rate',
    value: 4.18,
    unit: '%',
    change: 2.1,
    trend: 'up' as const,
    category: 'conversion' as const,
    priority: 'high' as const,
    target: 5.0
  },
  {
    id: 'bounce-default',
    title: 'Bounce Rate',
    value: 38.5,
    unit: '%',
    change: -3.2,
    trend: 'up' as const,
    category: 'conversion' as const,
    priority: 'medium' as const,
    target: 30.0
  },
  {
    id: 'sessions-default',
    title: 'Avg Session Duration',
    value: 5.47,
    unit: 'min',
    change: 18.4,
    trend: 'up' as const,
    category: 'conversion' as const,
    priority: 'medium' as const,
    target: 6.0
  },
  {
    id: 'pageviews-default',
    title: 'Page Views',
    value: 18643,
    unit: '',
    change: 9.8,
    trend: 'up' as const,
    category: 'users' as const,
    priority: 'low' as const,
    target: 20000
  },
  {
    id: 'retention-default',
    title: 'User Retention',
    value: 72.3,
    unit: '%',
    change: 5.4,
    trend: 'up' as const,
    category: 'users' as const,
    priority: 'high' as const,
    target: 80.0
  }
];

/**
 * Performance metrics section with consistent spacing and layout
 */
export const MetricsSection = ({ 
  performanceMetrics, 
  filters, 
  onFiltersChange, 
  onExport 
}: MetricsSectionProps) => {
  // Use provided metrics or fall back to default mock data
  const metricsToDisplay = performanceMetrics?.length > 0 ? performanceMetrics : defaultMetrics;
  
  return (
    <div className="space-y-6">
      {/* Desktop Layout - Filters Sidebar + Metrics Grid */}
      <div className="hidden lg:grid lg:grid-cols-5 xl:grid-cols-6 gap-8">
        <div className="lg:col-span-1 xl:col-span-1">
          <DashboardFilters
            filters={filters}
            onFiltersChange={onFiltersChange}
            onExport={onExport}
          />
        </div>
        
        <div className="lg:col-span-4 xl:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl lg:text-3xl font-semibold flex items-center gap-3">
              <TrendingUp className="h-6 w-6" />
              Performance Metrics
              {filters.category.length > 0 && (
                <Badge variant="secondary" className="ml-3 text-sm">
                  Filtered by {filters.category.length} categories
                </Badge>
              )}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {metricsToDisplay.map((metric) => (
              <EnhancedMetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-3">
          <TrendingUp className="h-5 w-5" />
          Performance Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metricsToDisplay.slice(0, 6).map((metric) => (
            <EnhancedMetricCard key={metric.id} metric={metric} />
          ))}
        </div>
        {metricsToDisplay.length > 6 && (
          <div className="text-center">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              View All Metrics ({metricsToDisplay.length - 6} more)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
