
import React, { useEffect, useState } from 'react';
import { DashboardDataService } from '@/services/dashboardDataService';
import { DashboardSkeleton } from '@/components/LoadingProvider';
import { DashboardLayout } from './layout/DashboardLayout';
import { DashboardErrorState } from './layout/DashboardErrorState';
import { DashboardSections } from './layout/DashboardSections';
import { useDashboardOrchestration } from '@/hooks/useDashboardOrchestration';

/**
 * Main dashboard content component - now focused and clean
 */
export const DashboardContent = () => {
  const {
    isLive,
    filters,
    notifications,
    isLoading,
    error,
    toggleLiveData,
    setFilters,
    clearNotifications,
    markNotificationAsRead,
    handleRefresh,
    generateInitialData
  } = useDashboardOrchestration();

  const [dashboardData, setDashboardData] = useState<any>(null);

  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        console.log('🚀 Initializing dashboard data...');
        const data = DashboardDataService.generateInitialData();
        console.log('📊 Generated data:', data);
        
        // Ensure all required arrays exist with fallbacks
        const completeData = {
          metrics: data.metrics || [],
          performanceMetrics: data.performanceMetrics || [],
          salesData: data.salesData || [],
          trafficData: data.trafficData || [],
          areaData: data.areaData || [],
          radarData: data.radarData || [],
          treemapData: data.treemapData || [],
          scatterData: data.scatterData || [],
          funnelData: data.funnelData || [],
          gaugeData: data.gaugeData || [],
          sankeyData: data.sankeyData || { nodes: [], links: [] },
          candlestickData: data.candlestickData || [],
          donutData: data.donutData || [],
          barData: data.barData || [],
          sentimentData: data.sentimentData || [],
          engagementData: data.engagementData || [],
          cryptoData: data.cryptoData || [],
          hashtagData: data.hashtagData || []
        };
        
        setDashboardData(completeData);
        generateInitialData();
        console.log('✅ Dashboard data initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize dashboard data:', error);
      }
    };

    initializeData();
  }, [generateInitialData]);

  // Error state
  if (error) {
    return <DashboardErrorState error={error} onRetry={handleRefresh} />;
  }

  // Loading state
  if (isLoading || !dashboardData) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardSections
        dashboardData={dashboardData}
        isLive={isLive}
        filters={filters}
        notifications={notifications}
        toggleLiveData={toggleLiveData}
        initializeData={handleRefresh}
        setFilters={setFilters}
        clearNotifications={clearNotifications}
        markNotificationAsRead={markNotificationAsRead}
      />
    </DashboardLayout>
  );
};
