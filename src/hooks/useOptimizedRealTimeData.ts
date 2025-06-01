
import { useCallback, useEffect, useMemo } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { FilterUtils } from '@/utils/filterUtils';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useSocialCryptoData } from './useSocialCryptoData';
import { NotificationService } from '@/services/notificationService';

/**
 * Optimized real-time data hook with better state management
 */
export const useOptimizedRealTimeData = () => {
  const { state, dispatch } = useDashboard();
  
  // Use specialized hooks with memoization
  const { 
    metrics, 
    performanceMetrics, 
    generateInitialMetrics, 
    updateMetrics 
  } = useMetricsData();

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
    generateInitialCharts,
    updateTrafficData
  } = useChartsData();

  const {
    sentimentData,
    engagementData,
    cryptoData,
    hashtagData,
    generateInitialSocialCrypto
  } = useSocialCryptoData();

  // Memoized filtered performance metrics
  const filteredPerformanceMetrics = useMemo(() => 
    FilterUtils.filterPerformanceMetrics(performanceMetrics, state.filters),
    [performanceMetrics, state.filters]
  );

  /**
   * Add notification with optimized state management
   */
  const addNotification = useCallback((notification: any) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  }, [dispatch]);

  /**
   * Generate initial data with loading states
   */
  const generateInitialData = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    
    try {
      console.log('🚀 Generating comprehensive dashboard data...');
      
      await Promise.all([
        generateInitialMetrics(),
        generateInitialCharts(),
        generateInitialSocialCrypto()
      ]);

      console.log('✅ Comprehensive dashboard data generated successfully');
    } catch (error) {
      console.error('❌ Error generating dashboard data:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load dashboard data' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [generateInitialMetrics, generateInitialCharts, generateInitialSocialCrypto, dispatch]);

  /**
   * Update real-time data with optimized batching
   */
  const updateRealTimeData = useCallback(() => {
    if (!state.isLive) return;

    console.log('📊 Updating real-time data...');

    // Batch updates to reduce re-renders
    requestAnimationFrame(() => {
      updateMetrics(state.isLive, addNotification);
      updateTrafficData(state.isLive);
    });
  }, [state.isLive, updateMetrics, updateTrafficData, addNotification]);

  /**
   * Toggle live data with optimized state update
   */
  const toggleLiveData = useCallback(() => {
    console.log(`🔄 Live data ${!state.isLive ? 'started' : 'stopped'}`);
    dispatch({ type: 'SET_LIVE', payload: !state.isLive });
  }, [state.isLive, dispatch]);

  /**
   * Handle export with notification
   */
  const handleExport = useCallback((format: 'pdf' | 'excel' | 'csv' | 'png') => {
    console.log(`📤 Exporting dashboard data as ${format.toUpperCase()}...`);
    
    const notification = NotificationService.createExportNotification(format);
    addNotification(notification);
  }, [addNotification]);

  /**
   * Update filters with optimized state management
   */
  const setFilters = useCallback((filters: any) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, [dispatch]);

  /**
   * Clear notifications
   */
  const clearNotifications = useCallback(() => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  }, [dispatch]);

  /**
   * Mark notification as read
   */
  const markNotificationAsRead = useCallback((id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  }, [dispatch]);

  // Initialize data on mount
  useEffect(() => {
    generateInitialData();
  }, [generateInitialData]);

  // Set up real-time updates with cleanup
  useEffect(() => {
    if (!state.isLive) return;
    
    const interval = setInterval(updateRealTimeData, 1500);
    return () => clearInterval(interval);
  }, [state.isLive, updateRealTimeData]);

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
