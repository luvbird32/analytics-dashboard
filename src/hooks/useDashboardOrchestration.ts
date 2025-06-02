import { useCallback, useEffect } from 'react';
import { useSimplifiedDashboardState } from './useSimplifiedDashboardState';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useSocialCryptoData } from './useSocialCryptoData';
import { useSimplifiedRealTimeCoordinator } from './useSimplifiedRealTimeCoordinator';
import { useSimplifiedDataManager } from './useSimplifiedDataManager';
import { useDataInitialization } from './useDataInitialization';

/**
 * Main dashboard orchestration hook - now much cleaner with error handling
 */
export const useDashboardOrchestration = () => {
  console.log('🔧 useDashboardOrchestration starting...');
  
  try {
    const { state, setFilters } = useSimplifiedDashboardState();
    const { isLive, toggleLiveData } = useSimplifiedRealTimeCoordinator();
    
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

    console.log('🔧 All hooks loaded successfully:', {
      metricsLength: metrics?.length || 0,
      salesDataLength: salesData?.length || 0,
      trafficDataLength: trafficData?.length || 0
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
      treemapData,
      scatterData,
      funnelData,
      gaugeData,
      sankeyData,
      candlestickData,
      donutData,
      barData
    };

    const sanitizedData = useSimplifiedDataManager(rawData);

    // Initialize data on mount with error handling
    useEffect(() => {
      const initData = () => {
        try {
          console.log('🚀 Initializing dashboard data...');
          generateInitialData();
        } catch (error) {
          console.error('❌ Error initializing data:', error);
        }
      };
      
      initData();
    }, [generateInitialData]);

    const handleRefresh = useCallback(() => {
      try {
        console.log('🔄 Refreshing dashboard data...');
        generateInitialData();
      } catch (error) {
        console.error('❌ Error refreshing data:', error);
      }
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

    const result = {
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

    console.log('✅ useDashboardOrchestration completed successfully');
    return result;
    
  } catch (error) {
    console.error('❌ Critical error in useDashboardOrchestration:', error);
    return {
      isLive: false,
      filters: {},
      notifications: [],
      isLoading: false,
      error: 'Failed to load dashboard',
      metrics: [],
      performanceMetrics: [],
      salesData: [],
      trafficData: [],
      areaData: [],
      radarData: [],
      treemapData: [],
      scatterData: [],
      funnelData: [],
      gaugeData: [],
      sankeyData: { nodes: [], links: [] },
      candlestickData: [],
      donutData: [],
      barData: [],
      sentimentData: [],
      engagementData: [],
      cryptoData: [],
      hashtagData: [],
      toggleLiveData: () => {},
      handleRefresh: () => {},
      clearNotifications: () => {},
      markNotificationAsRead: () => {},
      setSanitizedFilters: () => {}
    };
  }
};
