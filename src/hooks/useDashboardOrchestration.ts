
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
  const metricsData = useMetricsData();
  const chartsData = useChartsData();
  const socialCryptoData = useSocialCryptoData();
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
    metrics: metricsData.metrics,
    performanceMetrics: metricsData.performanceMetrics,
    salesData: chartsData.salesData,
    trafficData: chartsData.trafficData,
    areaData: chartsData.areaData,
    radarData: chartsData.radarData,
    treemapData: chartsData.treemapData,
    scatterData: chartsData.scatterData,
    funnelData: chartsData.funnelData,
    gaugeData: chartsData.gaugeData,
    sankeyData: chartsData.sankeyData,
    candlestickData: chartsData.candlestickData,
    donutData: chartsData.donutData,
    barData: chartsData.barData,
    sentimentData: socialCryptoData.sentimentData,
    engagementData: socialCryptoData.engagementData,
    cryptoData: socialCryptoData.cryptoData,
    hashtagData: socialCryptoData.hashtagData,
    
    // Action functions
    toggleLiveData: dashboardState.toggleLiveData,
    setFilters: dashboardState.setFilters,
    clearNotifications: dashboardState.clearNotifications,
    markNotificationAsRead: dashboardState.markNotificationAsRead,
    handleRefresh,
    generateInitialData: dataInitialization.generateInitialData
  };
};
