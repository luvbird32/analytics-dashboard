
import { useCallback } from 'react';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useDashboardState } from './useDashboardState';

/**
 * Coordinates real-time data updates across different data sources
 */
export const useRealTimeCoordinator = () => {
  const { state, addNotification } = useDashboardState();
  const { updateMetrics } = useMetricsData();
  const { updateTrafficData } = useChartsData();

  const coordinateUpdates = useCallback(() => {
    if (!state.isLive) return;

    console.log('🔄 Coordinating real-time updates...');

    // Batch updates for performance
    requestAnimationFrame(() => {
      updateMetrics(state.isLive, addNotification);
      updateTrafficData(state.isLive);
    });
  }, [state.isLive, updateMetrics, updateTrafficData, addNotification]);

  return {
    coordinateUpdates,
    isLive: state.isLive
  };
};
