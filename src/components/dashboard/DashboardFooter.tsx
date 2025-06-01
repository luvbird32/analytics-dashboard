
import { Card, CardContent } from '@/components/ui/card';
import { MetricData, PerformanceMetric, NotificationData, DashboardFilters } from '@/types/dashboard';

interface DashboardFooterProps {
  metrics: MetricData[];
  performanceMetrics: PerformanceMetric[];
  notifications: NotificationData[];
  filters: DashboardFilters;
  isLive: boolean;
}

/**
 * Dashboard statistics footer with key metrics overview
 */
export const DashboardFooter = ({
  metrics,
  performanceMetrics,
  notifications,
  filters,
  isLive
}: DashboardFooterProps) => {
  return (
    <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
          <div>
            <p className="text-xl sm:text-2xl font-bold text-primary">{metrics.length}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Data Points</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-primary">{performanceMetrics.length}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">KPI Metrics</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-primary">{notifications.length}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Live Alerts</p>
          </div>
          <div className="hidden sm:block">
            <p className="text-xl sm:text-2xl font-bold text-primary">
              {filters.category.length + filters.region.length + filters.userType.length}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">Active Filters</p>
          </div>
          <div className="hidden lg:block">
            <p className="text-xl sm:text-2xl font-bold text-primary">
              {isLive ? '1.5s' : 'Paused'}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">Update Interval</p>
          </div>
        </div>
        
        {/* Copyright Notice */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Victor Aniemeka. All rights reserved.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
