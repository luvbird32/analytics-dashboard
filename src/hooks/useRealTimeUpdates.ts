
import { useEffect } from 'react';
import { useRealTimeCoordinator } from './useRealTimeCoordinator';

/**
 * Hook for managing real-time data updates with coordination
 */
export const useRealTimeUpdates = () => {
  const { coordinateUpdates, isLive } = useRealTimeCoordinator();

  // Set up real-time updates with cleanup
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(coordinateUpdates, 1500);
    return () => clearInterval(interval);
  }, [isLive, coordinateUpdates]);

  return {
    updateRealTimeData: coordinateUpdates
  };
};
