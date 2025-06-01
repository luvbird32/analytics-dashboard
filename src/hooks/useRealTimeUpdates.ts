
import { useCallback, useEffect } from 'react';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useDashboardState } from './useDashboardState';

/**
 * Hook for managing real-time data updates
 */
export const useRealTimeUpdates = () => {
  const { state, addNotification } = useDashboardState();
  const { updateMetrics } = useMetricsData();
  const { updateTrafficData } = useChartsData();

  const updateRealTimeData = useCallback(() => {
    if (!state.isLive) return;

    console.log('📊 Updating real-time data...');

    // Batch updates to reduce re-renders
    requestAnimationFrame(() => {
      updateMetrics(state.isLive, addNotification);
      updateTrafficData(state.isLive);
    });
  }, [state.isLive, updateMetrics, updateTrafficData, addNotification]);

  // Set up real-time updates with cleanup
  useEffect(() => {
    if (!state.isLive) return;
    
    const interval = setInterval(updateRealTimeData, 1500);
    return () => clearInterval(interval);
  }, [state.isLive, updateRealTimeData]);

  return {
    updateRealTimeData
  };
};
