
import { useCallback, useEffect } from 'react';
import { useSimplifiedDashboardState } from './useSimplifiedDashboardState';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useSocialCryptoData } from './useSocialCryptoData';
import { useSimplifiedRealTimeCoordinator } from './useSimplifiedRealTimeCoordinator';
import { useSimplifiedDataManager } from './useSimplifiedDataManager';
import { useDataInitialization } from './useDataInitialization';

/**
 * Main dashboard orchestration hook - now much cleaner
 */
export const useDashboardOrchestration = () => {
  const { state, setFilters } = useSimplifiedDashboardState();
  const { isLive, toggleLiveData } = useSimplifiedRealTimeCoordinator();
  
  const { metrics, performanceMetrics } = useMetricsData();
  const { salesData, trafficData, areaData, radarData } = useChartsData();
  const { sentimentData, engagementData, cryptoData, hashtagData } = useSocialCryptoData();
  const { generateInitialData } = useDataInitialization();

  // Collect raw data including all chart types
  const rawData = {
    metrics,
    performanceMetrics,
    salesData,
    trafficData,
    areaData,
    radarData,
    sentimentData,
    engagementData,
    cryptoData,
    hashtagData,
    // Add missing chart data with empty defaults
    treemapData: [],
    scatterData: [],
    funnelData: [],
    gaugeData: [],
    sankeyData: { nodes: [], links: [] },
    candlestickData: [],
    donutData: [],
    barData: []
  };

  const sanitizedData = useSimplifiedDataManager(rawData);

  // Initialize data on mount
  useEffect(() => {
    generateInitialData();
  }, [generateInitialData]);

  const handleRefresh = useCallback(() => {
    generateInitialData();
  }, [generateInitialData]);

  const clearNotifications = useCallback(() => {
    console.log('Clearing notifications...');
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    console.log('Marking notification as read:', id);
  }, []);

  const setSanitizedFilters = useCallback((filters: any) => {
    setFilters(filters);
  }, [setFilters]);

  return {
    // State
    isLive,
    filters: state.filters,
    notifications: state.notifications || [],
    isLoading: state.isLoading,
    error: state.error,
    
    // Data - include all chart data
    ...sanitizedData,
    
    // Actions
    toggleLiveData,
    handleRefresh,
    clearNotifications,
    markNotificationAsRead,
    setSanitizedFilters
  };
};
