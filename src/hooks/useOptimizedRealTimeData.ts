
import { useEffect, useMemo } from 'react';
import { FilterUtils } from '@/utils/filterUtils';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useSocialCryptoData } from './useSocialCryptoData';
import { useSimplifiedDashboardState } from './useSimplifiedDashboardState';
import { useDataInitialization } from './useDataInitialization';
import { useSimplifiedRealTimeCoordinator } from './useSimplifiedRealTimeCoordinator';
import { useExportHandling } from './useExportHandling';

/**
 * Optimized real-time data hook - simplified and focused
 */
export const useOptimizedRealTimeData = () => {
  const { state, setFilters } = useSimplifiedDashboardState();
  const { isLive, toggleLiveData } = useSimplifiedRealTimeCoordinator();
  const { metrics, performanceMetrics } = useMetricsData();
  const { salesData, trafficData, areaData, radarData } = useChartsData();
  const { sentimentData, engagementData, cryptoData, hashtagData } = useSocialCryptoData();
  const { generateInitialData } = useDataInitialization();
  const { handleExport } = useExportHandling();

  // Filtered performance metrics
  const filteredPerformanceMetrics = useMemo(() => 
    FilterUtils.filterPerformanceMetrics(performanceMetrics, state.filters),
    [performanceMetrics, state.filters]
  );

  // Initialize data on mount
  useEffect(() => {
    generateInitialData();
  }, [generateInitialData]);

  // Clear notifications function
  const clearNotifications = () => {
    console.log('Clearing notifications...');
  };

  // Mark notification as read function
  const markNotificationAsRead = (id: string) => {
    console.log('Marking notification as read:', id);
  };

  return useMemo(() => ({
    isLive,
    filters: state.filters,
    notifications: state.notifications || [],
    isLoading: state.isLoading,
    error: state.error,
    metrics,
    salesData,
    trafficData,
    performanceMetrics: filteredPerformanceMetrics,
    areaData,
    radarData,
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
    isLive,
    state,
    metrics,
    salesData,
    trafficData,
    filteredPerformanceMetrics,
    areaData,
    radarData,
    sentimentData,
    engagementData,
    cryptoData,
    hashtagData,
    toggleLiveData,
    generateInitialData,
    setFilters,
    handleExport
  ]);
};
