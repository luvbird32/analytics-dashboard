
import { useCallback, useEffect } from 'react';
import { useSimplifiedDashboardState } from './useSimplifiedDashboardState';

/**
 * Simplified real-time coordination hook
 */
export const useSimplifiedRealTimeCoordinator = () => {
  const { state, toggleLiveData } = useSimplifiedDashboardState();

  const updateRealTimeData = useCallback(() => {
    if (!state.isLive) return;
    console.log('📊 Updating real-time data...');
  }, [state.isLive]);

  useEffect(() => {
    if (!state.isLive) return;
    
    const interval = setInterval(updateRealTimeData, 2000);
    return () => clearInterval(interval);
  }, [state.isLive, updateRealTimeData]);

  return {
    isLive: state.isLive,
    toggleLiveData,
    updateRealTimeData
  };
};
