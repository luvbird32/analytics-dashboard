
import React from 'react';
import { DashboardSkeleton } from '@/components/LoadingProvider';
import { DashboardLayout } from './layout/DashboardLayout';
import { DashboardErrorState } from './layout/DashboardErrorState';
import { DashboardSections } from './layout/DashboardSections';
import { useDashboardOrchestration } from '@/hooks/useDashboardOrchestration';

/**
 * Main dashboard content component with enhanced error handling
 */
export const DashboardContent = () => {
  console.log('🔍 DashboardContent rendering...');
  
  let dashboardData;
  
  try {
    dashboardData = useDashboardOrchestration();
    console.log('✅ Dashboard orchestration hook loaded successfully:', {
      hasData: !!dashboardData,
      isLoading: dashboardData?.isLoading,
      error: dashboardData?.error
    });
  } catch (error) {
    console.error('❌ Error in useDashboardOrchestration:', error);
    return (
      <DashboardLayout>
        <DashboardErrorState 
          error="Failed to load dashboard data" 
          onRetry={() => window.location.reload()} 
        />
      </DashboardLayout>
    );
  }

  // Error state
  if (dashboardData.error) {
    console.log('📍 Rendering error state:', dashboardData.error);
    return <DashboardErrorState error={dashboardData.error} onRetry={dashboardData.handleRefresh} />;
  }

  // Loading state
  if (dashboardData.isLoading) {
    console.log('📍 Rendering loading state');
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  console.log('📍 Rendering main dashboard with data:', {
    metricsCount: dashboardData.metrics?.length || 0,
    performanceMetricsCount: dashboardData.performanceMetrics?.length || 0
  });

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
        setSanitizedFilters={dashboardData.setSanitizedFilters}
        clearNotifications={dashboardData.clearNotifications}
        markNotificationAsRead={dashboardData.markNotificationAsRead}
      />
    </DashboardLayout>
  );
};
