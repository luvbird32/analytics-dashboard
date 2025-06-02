
import React, { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { DashboardSkeleton } from '@/components/LoadingProvider';
import { ChartsGrid } from '../ChartsGrid';

interface DashboardChartsSectionProps {
  dashboardData: any;
  notifications: any[];
  isLive: boolean;
  clearNotifications: () => void;
  markNotificationAsRead: (id: string) => void;
}

/**
 * Focused charts section component
 */
export const DashboardChartsSection = ({
  dashboardData,
  notifications,
  isLive,
  clearNotifications,
  markNotificationAsRead
}: DashboardChartsSectionProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<DashboardSkeleton />}>
        <ChartsGrid
          metrics={dashboardData?.metrics || []}
          salesData={dashboardData?.salesData || []}
          trafficData={dashboardData?.trafficData || []}
          areaData={dashboardData?.areaData || []}
          radarData={dashboardData?.radarData || []}
          notifications={notifications || []}
          treemapData={dashboardData?.treemapData || []}
          scatterData={dashboardData?.scatterData || []}
          funnelData={dashboardData?.funnelData || []}
          gaugeData={dashboardData?.gaugeData || []}
          sankeyData={dashboardData?.sankeyData || { nodes: [], links: [] }}
          candlestickData={dashboardData?.candlestickData || []}
          donutData={dashboardData?.donutData || []}
          barData={dashboardData?.barData || []}
          sentimentData={dashboardData?.sentimentData || []}
          engagementData={dashboardData?.engagementData || []}
          cryptoData={dashboardData?.cryptoData || []}
          hashtagData={dashboardData?.hashtagData || []}
          isLive={isLive}
          onClearNotifications={clearNotifications}
          onMarkNotificationAsRead={markNotificationAsRead}
        />
      </Suspense>
    </ErrorBoundary>
  );
};
