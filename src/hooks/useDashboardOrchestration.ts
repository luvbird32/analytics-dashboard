import { useCallback, useEffect } from 'react';
import { useDashboardState } from './useDashboardState';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useSocialCryptoData } from './useSocialCryptoData';
import { useRealTimeUpdates } from './useRealTimeUpdates';
import { SanitizationService } from '@/services/security/sanitizationService';

/**
 * Main orchestration hook for dashboard functionality
 * Combines data management, real-time updates, and initialization with sanitization
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

  // Enhanced filter setting with sanitization
  const setSanitizedFilters = useCallback((filters: any) => {
    const sanitizedFilters = SanitizationService.sanitizeDashboardFilters(filters);
    setFilters(sanitizedFilters);
  }, [setFilters]);

  // Enhanced notification handling with sanitization
  const addSanitizedNotification = useCallback((notification: any) => {
    const sanitizedNotification = SanitizationService.sanitizeNotification(notification);
    // Note: This would need to be implemented in useDashboardState
    console.log('Sanitized notification:', sanitizedNotification);
  }, []);

  // Enhanced data initialization with sanitization
  const generateInitialData = useCallback(async () => {
    console.log('🚀 Starting data initialization with sanitization...');
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

      console.log('✅ All data loaded and sanitized successfully');
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
    
    // Enhanced data properties with sanitization
    metrics: metrics ? SanitizationService.sanitizeChartData(metrics) : [],
    performanceMetrics: performanceMetrics ? SanitizationService.sanitizeChartData(performanceMetrics) : [],
    salesData: salesData ? SanitizationService.sanitizeChartData(salesData) : [],
    trafficData: trafficData ? SanitizationService.sanitizeChartData(trafficData) : [],
    areaData: areaData ? SanitizationService.sanitizeChartData(areaData) : [],
    radarData: radarData ? SanitizationService.sanitizeChartData(radarData) : [],
    treemapData: treemapData ? SanitizationService.sanitizeChartData(treemapData) : [],
    scatterData: scatterData ? SanitizationService.sanitizeChartData(scatterData) : [],
    funnelData: funnelData ? SanitizationService.sanitizeChartData(funnelData) : [],
    gaugeData: gaugeData ? SanitizationService.sanitizeChartData(gaugeData) : [],
    sankeyData,
    candlestickData: candlestickData ? SanitizationService.sanitizeChartData(candlestickData) : [],
    donutData: donutData ? SanitizationService.sanitizeChartData(donutData) : [],
    barData: barData ? SanitizationService.sanitizeChartData(barData) : [],
    sentimentData: sentimentData ? SanitizationService.sanitizeChartData(sentimentData) : [],
    engagementData: engagementData ? SanitizationService.sanitizeChartData(engagementData) : [],
    cryptoData: cryptoData ? SanitizationService.sanitizeChartData(cryptoData) : [],
    hashtagData: hashtagData ? SanitizationService.sanitizeChartData(hashtagData) : [],
    
    // Enhanced action functions with sanitization
    toggleLiveData,
    setFilters: setSanitizedFilters,
    clearNotifications,
    markNotificationAsRead,
    handleRefresh,
    generateInitialData,
    addSanitizedNotification
  };
};
