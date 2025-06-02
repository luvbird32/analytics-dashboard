
import { useCallback, useEffect } from 'react';
import { useDashboardState } from './useDashboardState';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useSocialCryptoData } from './useSocialCryptoData';
import { useRealTimeUpdates } from './useRealTimeUpdates';

/**
 * Main orchestration hook for dashboard functionality
 * Combines data management, real-time updates, and initialization
 */
export const useDashboardOrchestration = () => {
  // Always call all hooks in the same order - critical for React
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
  
  // Setup real-time updates with proper cleanup
  useRealTimeUpdates();

  // Combined data initialization function
  const generateInitialData = useCallback(async () => {
    console.log('🚀 Starting data initialization...');
    setLoading(true);
    setError(null);
    
    try {
      // Initialize all data sequentially
      console.log('📊 Generating metrics data...');
      generateInitialMetrics();
      
      console.log('📈 Generating charts data...');
      generateInitialCharts();
      
      console.log('📱 Generating social/crypto data...');
      generateInitialSocialCrypto();

      console.log('✅ All data loaded successfully');
    } catch (error) {
      console.error('❌ Error loading dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      // Ensure loading state is always reset
      setTimeout(() => {
        setLoading(false);
        console.log('🎯 Data initialization complete');
      }, 100);
    }
  }, [generateInitialMetrics, generateInitialCharts, generateInitialSocialCrypto, setLoading, setError]);

  // Initialize data on mount with error handling
  useEffect(() => {
    console.log('🚀 Dashboard orchestration initializing...');
    generateInitialData();
  }, [generateInitialData]);

  const handleRefresh = useCallback(() => {
    console.log('🔄 Refreshing dashboard data...');
    generateInitialData();
  }, [generateInitialData]);

  return {
    // State properties
    isLive: state.isLive,
    filters: state.filters,
    notifications: state.notifications,
    isLoading: state.isLoading,
    error: state.error,
    
    // Data properties
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
