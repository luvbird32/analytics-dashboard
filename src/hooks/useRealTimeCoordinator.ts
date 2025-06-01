
import { useCallback } from 'react';
import { useDashboardState } from './useDashboardState';

/**
 * Coordinates real-time data updates across different data sources
 */
export const useRealTimeCoordinator = () => {
  const { state, addNotification } = useDashboardState();

  const coordinateUpdates = useCallback(() => {
    if (!state.isLive) return;

    console.log('🔄 Coordinating real-time updates...');

    // Batch updates for performance
    requestAnimationFrame(() => {
      // Simulate metric updates
      if (Math.random() > 0.7) {
        addNotification({
          id: Date.now().toString(),
          title: 'Metric Update',
          message: 'Real-time data updated',
          type: 'info',
          timestamp: new Date().toISOString(),
          read: false
        });
      }
    });
  }, [state.isLive, addNotification]);

  return {
    coordinateUpdates,
    isLive: state.isLive
  };
};
