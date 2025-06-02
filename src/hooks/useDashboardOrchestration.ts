
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

  // Debug logging to trace data flow
  console.log('🔍 Dashboard Orchestration - Raw Data Check:', {
    metricsLength: metrics?.length || 0,
    performanceMetricsLength: performanceMetrics?.length || 0,
    salesDataLength: salesData?.length || 0,
    trafficDataLength: trafficData?.length || 0,
    sentimentDataLength: sentimentData?.length || 0,
    engagementDataLength: engagementData?.length || 0,
    cryptoDataLength: cryptoData?.length || 0,
    hashtagDataLength: hashtagData?.length || 0,
    areaDataLength: areaData?.length || 0,
    radarDataLength: radarData?.length || 0
  });

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

  console.log('🔍 Dashboard Orchestration - Raw Data Object:', rawData);

  const sanitizedData = useSimplifiedDataManager(rawData);

  console.log('🔍 Dashboard Orchestration - Sanitized Data:', sanitizedData);

  // Initialize data on mount
  useEffect(() => {
    console.log('🚀 Initializing dashboard data...');
    generateInitialData();
  }, [generateInitialData]);

  const handleRefresh = useCallback(() => {
    console.log('🔄 Refreshing dashboard data...');
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

  const finalData = {
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

  console.log('🔍 Dashboard Orchestration - Final Data:', finalData);

  return finalData;
};
