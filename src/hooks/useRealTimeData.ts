
import { useState, useEffect, useCallback } from 'react';
import { DashboardFilters } from '@/types/dashboard';
import { FilterUtils } from '@/utils/filterUtils';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useSocialCryptoData } from './useSocialCryptoData';
import { useNotifications } from './useNotifications';

/**
 * Real-time dashboard data management hook
 * Orchestrates data generation, updates, and filtering
 */
export const useRealTimeData = () => {
  const [isLive, setIsLive] = useState(false);
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: '30d',
    category: [],
    region: [],
    userType: []
  });

  // Use specialized hooks
  const { 
    metrics, 
    performanceMetrics, 
    generateInitialMetrics, 
    updateMetrics 
  } = useMetricsData();

  const {
    salesData,
    trafficData,
    heatmapData,
    radarData,
    areaData,
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

  const {
    notifications,
    addNotification,
    handleExport,
    clearNotifications,
    markNotificationAsRead
  } = useNotifications();

  /**
   * Generates comprehensive initial data using specialized hooks
   */
  const generateInitialData = useCallback(() => {
    console.log('🚀 Generating comprehensive dashboard data...');
    
    generateInitialMetrics();
    generateInitialCharts();
    generateInitialSocialCrypto();

    console.log('✅ Comprehensive dashboard data generated successfully');
  }, [generateInitialMetrics, generateInitialCharts, generateInitialSocialCrypto]);

  /**
   * Updates real-time data with notifications
   */
  const updateRealTimeData = useCallback(() => {
    if (!isLive) return;

    console.log('📊 Updating real-time data...');

    updateMetrics(isLive, addNotification);
    updateTrafficData(isLive);
  }, [isLive, updateMetrics, updateTrafficData, addNotification]);

  /**
   * Toggles live data updates
   */
  const toggleLiveData = useCallback(() => {
    console.log(`🔄 Live data ${!isLive ? 'started' : 'stopped'}`);
    setIsLive(!isLive);
  }, [isLive]);

  // Initialize data on mount
  useEffect(() => {
    generateInitialData();
  }, [generateInitialData]);

  // Set up real-time updates
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(updateRealTimeData, 1500);
    return () => clearInterval(interval);
  }, [isLive, updateRealTimeData]);

  return {
    isLive,
    metrics,
    salesData,
    trafficData,
    performanceMetrics: FilterUtils.filterPerformanceMetrics(performanceMetrics, filters),
    heatmapData,
    radarData,
    areaData,
    notifications,
    filters,
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
  };
};
