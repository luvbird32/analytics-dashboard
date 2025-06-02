
import { useCallback } from 'react';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useDashboardState } from './useDashboardState';

/**
 * Coordinates real-time data updates across different data sources
 * Fixed to prevent memory leaks and improve error handling
 */
export const useRealTimeCoordinator = () => {
  const { state, addNotification } = useDashboardState();
  const { updateMetrics } = useMetricsData();
  const { updateTrafficData } = useChartsData();

  const coordinateUpdates = useCallback(() => {
    if (!state.isLive) return;

    console.log('🔄 Coordinating real-time updates...');

    try {
      // Batch updates for performance with error handling
      requestAnimationFrame(() => {
        try {
          updateMetrics(state.isLive, addNotification);
          updateTrafficData(state.isLive);
        } catch (error) {
          console.error('❌ Error during real-time update:', error);
        }
      });
    } catch (error) {
      console.error('❌ Error scheduling real-time updates:', error);
    }
  }, [state.isLive, updateMetrics, updateTrafficData, addNotification]);

  return {
    coordinateUpdates,
    isLive: state.isLive
  };
};
