
import { useCallback } from 'react';
import { useDashboardData } from './useDashboardData';
import { useRealTimeUpdates } from './useRealTimeUpdates';
import { useDataInitialization } from './useDataInitialization';

/**
 * Main orchestration hook for dashboard functionality
 * Combines data management, real-time updates, and initialization
 */
export const useDashboardOrchestration = () => {
  const dashboardData = useDashboardData();
  const dataInitialization = useDataInitialization();
  
  // Setup real-time updates
  useRealTimeUpdates();

  const handleRefresh = useCallback(() => {
    console.log('🔄 Refreshing dashboard data...');
    dataInitialization.generateInitialData();
  }, [dataInitialization]);

  return {
    // State properties
    isLive: dashboardData.isLive,
    filters: dashboardData.filters,
    notifications: dashboardData.notifications,
    isLoading: dashboardData.isLoading,
    error: dashboardData.error,
    
    // Data properties
    metrics: dashboardData.metrics,
    performanceMetrics: dashboardData.performanceMetrics,
    salesData: dashboardData.salesData,
    trafficData: dashboardData.trafficData,
    areaData: dashboardData.areaData,
    radarData: dashboardData.radarData,
    treemapData: dashboardData.treemapData,
    scatterData: dashboardData.scatterData,
    funnelData: dashboardData.funnelData,
    gaugeData: dashboardData.gaugeData,
    sankeyData: dashboardData.sankeyData,
    candlestickData: dashboardData.candlestickData,
    donutData: dashboardData.donutData,
    barData: dashboardData.barData,
    sentimentData: dashboardData.sentimentData,
    engagementData: dashboardData.engagementData,
    cryptoData: dashboardData.cryptoData,
    hashtagData: dashboardData.hashtagData,
    
    // Action functions
    toggleLiveData: dashboardData.toggleLiveData,
    setFilters: dashboardData.setFilters,
    clearNotifications: dashboardData.clearNotifications,
    markNotificationAsRead: dashboardData.markNotificationAsRead,
    handleRefresh,
    generateInitialData: dataInitialization.generateInitialData
  };
};
