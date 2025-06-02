
import { useCallback, useEffect } from 'react';
import { useDashboardState } from './useDashboardState';
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
  // Use dashboard state instead of useDashboardData to avoid circular dependencies
  const {
    state,
    toggleLiveData,
    setFilters,
    clearNotifications,
    markNotificationAsRead
  } = useDashboardState();

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
  const { generateInitialData } = useDataInitialization();
  
  // Setup real-time updates with proper cleanup
  useRealTimeUpdates();

  // Initialize data on mount with error handling
  useEffect(() => {
    console.log('🚀 Dashboard orchestration initializing...');
    try {
      generateInitialData();
    } catch (error) {
      console.error('❌ Failed to initialize dashboard data:', error);
    }
  }, [generateInitialData]);

  const handleRefresh = useCallback(() => {
    console.log('🔄 Refreshing dashboard data...');
    try {
      generateInitialData();
    } catch (error) {
      console.error('❌ Failed to refresh dashboard data:', error);
    }
  }, [generateInitialData]);

  return {
    // State properties - using state object directly
    isLive: state.isLive,
    filters: state.filters,
    notifications: state.notifications,
    isLoading: state.isLoading,
    error: state.error,
    
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
    toggleLiveData,
    setFilters,
    clearNotifications,
    markNotificationAsRead,
    handleRefresh,
    generateInitialData
  };
};
