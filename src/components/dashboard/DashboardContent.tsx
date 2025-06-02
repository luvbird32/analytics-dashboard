
import React from 'react';
import { DashboardSkeleton } from '@/components/LoadingProvider';
import { DashboardLayout } from './layout/DashboardLayout';
import { DashboardErrorState } from './layout/DashboardErrorState';
import { DashboardSections } from './layout/DashboardSections';
import { useDashboardOrchestration } from '@/hooks/useDashboardOrchestration';

/**
 * Main dashboard content component - now focused and clean
 */
export const DashboardContent = () => {
  const dashboardData = useDashboardOrchestration();

  // Error state
  if (dashboardData.error) {
    return <DashboardErrorState error={dashboardData.error} onRetry={dashboardData.handleRefresh} />;
  }

  // Loading state
  if (dashboardData.isLoading) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardSections
        dashboardData={{
          metrics: dashboardData.metrics || [],
          performanceMetrics: dashboardData.performanceMetrics || [],
          salesData: dashboardData.salesData || [],
          trafficData: dashboardData.trafficData || [],
          areaData: dashboardData.areaData || [],
          radarData: dashboardData.radarData || [],
          treemapData: dashboardData.treemapData || [],
          scatterData: dashboardData.scatterData || [],
          funnelData: dashboardData.funnelData || [],
          gaugeData: dashboardData.gaugeData || [],
          sankeyData: dashboardData.sankeyData || { nodes: [], links: [] },
          candlestickData: dashboardData.candlestickData || [],
          donutData: dashboardData.donutData || [],
          barData: dashboardData.barData || [],
          sentimentData: dashboardData.sentimentData || [],
          engagementData: dashboardData.engagementData || [],
          cryptoData: dashboardData.cryptoData || [],
          hashtagData: dashboardData.hashtagData || []
        }}
        isLive={dashboardData.isLive}
        filters={dashboardData.filters}
        notifications={dashboardData.notifications}
        toggleLiveData={dashboardData.toggleLiveData}
        initializeData={dashboardData.handleRefresh}
        setFilters={dashboardData.setSanitizedFilters}
        clearNotifications={dashboardData.clearNotifications}
        markNotificationAsRead={dashboardData.markNotificationAsRead}
      />
    </DashboardLayout>
  );
};
