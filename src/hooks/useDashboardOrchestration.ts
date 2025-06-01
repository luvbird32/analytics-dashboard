
import { useCallback } from 'react';
import { useDashboardData } from './useDashboardData';
import { useRealTimeUpdates } from './useRealTimeUpdates';
import { useDataInitialization } from './useDataInitialization';

/**
 * Main orchestration hook for dashboard functionality
 * Combines data management, real-time updates, and initialization
 */
export const useDashboardOrchestration = () => {
  const dashboardData = useDashboardData();
  const dataInitialization = useDataInitialization();
  
  // Setup real-time updates
  useRealTimeUpdates();

  const handleRefresh = useCallback(() => {
    dataInitialization.generateInitialData();
  }, [dataInitialization]);

  return {
    ...dashboardData,
    handleRefresh,
    generateInitialData: dataInitialization.generateInitialData
  };
};
