
import { useEffect } from 'react';
import { useDashboardState } from './useDashboardState';

/**
 * Hook for managing real-time data updates
 */
export const useRealTimeUpdates = () => {
  const { state, addNotification } = useDashboardState();

  const updateRealTimeData = () => {
    if (!state.isLive) return;

    console.log('📊 Updating real-time data...');

    // Simulate real-time updates with notifications
    if (Math.random() > 0.7) {
      addNotification({
        id: Date.now().toString(),
        title: 'Real-time Update',
        message: 'Dashboard data refreshed',
        type: 'info',
        timestamp: new Date().toISOString(),
        read: false
      });
    }
  };

  // Set up real-time updates with cleanup
  useEffect(() => {
    if (!state.isLive) return;
    
    const interval = setInterval(updateRealTimeData, 1500);
    return () => clearInterval(interval);
  }, [state.isLive, addNotification]);

  return {
    updateRealTimeData
  };
};
