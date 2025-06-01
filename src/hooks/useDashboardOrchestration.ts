
import { useCallback, useEffect } from 'react';
import { useOptimizedRealTimeData } from './useOptimizedRealTimeData';
import { useRealTimeUpdates } from './useRealTimeUpdates';

/**
 * Main orchestration hook for dashboard functionality
 * Combines data management, real-time updates, and initialization
 */
export const useDashboardOrchestration = () => {
  const dashboardData = useOptimizedRealTimeData();
  
  // Setup real-time updates - moved here to avoid circular dependency
  useRealTimeUpdates();

  const handleRefresh = useCallback(() => {
    dashboardData.refreshData();
  }, [dashboardData]);

  return {
    ...dashboardData,
    handleRefresh,
    generateInitialData: dashboardData.refreshData
  };
};
