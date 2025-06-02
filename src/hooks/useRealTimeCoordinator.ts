
import { useCallback } from 'react';
import { useDashboardState } from './useDashboardState';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useNotifications } from './useNotifications';

/**
 * Coordinated real-time updates across all data sources
 */
export const useRealTimeCoordinator = () => {
  const { state } = useDashboardState();
  const { updateMetrics } = useMetricsData();
  const { updateTrafficData } = useChartsData();
  const { addNotification } = useNotifications();

  const coordinateUpdates = useCallback(() => {
    if (!state.isLive) return;

    console.log('📊 Coordinating real-time updates...');
    
    // Update metrics with notifications
    updateMetrics(state.isLive, addNotification);
    
    // Update traffic data
    updateTrafficData(state.isLive);

    console.log('✅ Real-time updates coordinated');
  }, [state.isLive, updateMetrics, updateTrafficData, addNotification]);

  return {
    coordinateUpdates,
    isLive: state.isLive
  };
};
