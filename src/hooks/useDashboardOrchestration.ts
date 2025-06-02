
import { useCallback, useEffect } from 'react';
import { useDashboardState } from './useDashboardState';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useSocialCryptoData } from './useSocialCryptoData';
import { useRealTimeUpdates } from './useRealTimeUpdates';
import { useDashboardDataManager } from './useDashboardDataManager';
import { useDashboardActions } from './useDashboardActions';
import { useDataInitialization } from './useDataInitialization';

/**
 * Simplified orchestration hook for dashboard functionality
 * Now focused only on coordination, with data management extracted
 */
export const useDashboardOrchestration = () => {
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
  
  useRealTimeUpdates();

  useEffect(() => {
    console.log('🚀 Dashboard orchestration initializing...');
    generateInitialData();
  }, [generateInitialData]);

  // Collect raw data for sanitization
  const rawData = {
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
    hashtagData
  };

  const sanitizedData = useDashboardDataManager(rawData);
  const actions = useDashboardActions(
    toggleLiveData,
    setFilters,
    clearNotifications,
    markNotificationAsRead,
    generateInitialData
  );

  return {
    // State properties
    isLive: state.isLive,
    filters: state.filters,
    notifications: state.notifications,
    isLoading: state.isLoading,
    error: state.error,
    
    // Sanitized data
    ...sanitizedData,
    
    // Actions
    ...actions
  };
};
