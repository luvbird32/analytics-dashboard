
import { useEffect, useMemo } from 'react';
import { FilterUtils } from '@/utils/filterUtils';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useSocialCryptoData } from './useSocialCryptoData';
import { useDashboardState } from './useDashboardState';
import { useDataInitialization } from './useDataInitialization';
import { useExportHandling } from './useExportHandling';

/**
 * Optimized real-time data hook with better state management
 */
export const useOptimizedRealTimeData = () => {
  // Always call hooks in the same order - no conditional calls
  const { state, toggleLiveData, setFilters, clearNotifications, markNotificationAsRead } = useDashboardState();
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
  const { handleExport } = useExportHandling();

  // Memoized filtered performance metrics
  const filteredPerformanceMetrics = useMemo(() => 
    FilterUtils.filterPerformanceMetrics(performanceMetrics, state.filters),
    [performanceMetrics, state.filters]
  );

  // Initialize data on mount
  useEffect(() => {
    generateInitialData();
  }, [generateInitialData]);

  // Memoized return object to prevent unnecessary re-renders
  return useMemo(() => ({
    isLive: state.isLive,
    filters: state.filters,
    notifications: state.notifications,
    isLoading: state.isLoading,
    error: state.error,
    metrics,
    salesData,
    trafficData,
    performanceMetrics: filteredPerformanceMetrics,
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
    toggleLiveData,
    refreshData: generateInitialData,
    clearNotifications,
    markNotificationAsRead,
    setFilters,
    handleExport
  }), [
    state,
    metrics,
    salesData,
    trafficData,
    filteredPerformanceMetrics,
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
    toggleLiveData,
    generateInitialData,
    clearNotifications,
    markNotificationAsRead,
    setFilters,
    handleExport
  ]);
};
