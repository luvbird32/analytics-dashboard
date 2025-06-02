
import { useCallback } from 'react';
import { useDashboardData } from './useDashboardData';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useSocialCryptoData } from './useSocialCryptoData';
import { useRealTimeUpdates } from './useRealTimeUpdates';
import { useDataInitialization } from './useDataInitialization';

/**
 * Main orchestration hook for dashboard functionality
 * Combines data management, real-time updates, and initialization
 */
export const useDashboardOrchestration = () => {
  const dashboardState = useDashboardData();
  const { metrics, performanceMetrics } = useMetricsData();
  const {
    salesData,
    trafficData,
    areaData,
    radarData,
    treemapData,
    scatterData,
    funnelData,
    gaugeData,
    sankeyData,
    candlestickData,
    donutData,
    barData
  } = useChartsData();
  const { sentimentData, engagementData, cryptoData, hashtagData } = useSocialCryptoData();
  const dataInitialization = useDataInitialization();
  
  // Setup real-time updates
  useRealTimeUpdates();

  const handleRefresh = useCallback(() => {
    console.log('🔄 Refreshing dashboard data...');
    dataInitialization.generateInitialData();
  }, [dataInitialization]);

  return {
    // State properties
    isLive: dashboardState.isLive,
    filters: dashboardState.filters,
    notifications: dashboardState.notifications,
    isLoading: dashboardState.isLoading,
    error: dashboardState.error,
    
    // Data properties from specialized hooks
    metrics,
    performanceMetrics,
    salesData,
    trafficData,
    areaData,
    radarData,
    treemapData,
    scatterData,
    funnelData,
    gaugeData,
    sankeyData,
    candlestickData,
    donutData,
    barData,
    sentimentData,
    engagementData,
    cryptoData,
    hashtagData,
    
    // Action functions
    toggleLiveData: dashboardState.toggleLiveData,
    setFilters: dashboardState.setFilters,
    clearNotifications: dashboardState.clearNotifications,
    markNotificationAsRead: dashboardState.markNotificationAsRead,
    handleRefresh,
    generateInitialData: dataInitialization.generateInitialData
  };
};
