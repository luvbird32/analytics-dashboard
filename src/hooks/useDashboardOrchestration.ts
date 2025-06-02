
import { useCallback, useEffect } from 'react';
import { useDashboardState } from './useDashboardState';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useSocialCryptoData } from './useSocialCryptoData';
import { useRealTimeUpdates } from './useRealTimeUpdates';
import { useDashboardDataManager } from './useDashboardDataManager';
import { useDashboardActions } from './useDashboardActions';

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
    markNotificationAsRead,
    setLoading,
    setError
  } = useDashboardState();

  const { metrics, performanceMetrics, generateInitialMetrics } = useMetricsData();
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
    barData,
    generateInitialCharts
  } = useChartsData();
  
  const { sentimentData, engagementData, cryptoData, hashtagData, generateInitialSocialCrypto } = useSocialCryptoData();
  
  useRealTimeUpdates();

  const generateInitialData = useCallback(async () => {
    console.log('🚀 Starting data initialization...');
    setLoading(true);
    setError(null);
    
    try {
      generateInitialMetrics();
      generateInitialCharts();
      generateInitialSocialCrypto();
      console.log('✅ All data loaded successfully');
    } catch (error) {
      console.error('❌ Error loading dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setTimeout(() => {
        setLoading(false);
        console.log('🎯 Data initialization complete');
      }, 100);
    }
  }, [generateInitialMetrics, generateInitialCharts, generateInitialSocialCrypto, setLoading, setError]);

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
