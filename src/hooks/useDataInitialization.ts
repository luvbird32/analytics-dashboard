
import { useCallback } from 'react';
import { DashboardDataService } from '@/services/dashboardDataService';
import { useDashboardState } from './useDashboardState';

/**
 * Hook for initializing dashboard data
 */
export const useDataInitialization = () => {
  const { setLoading, setError } = useDashboardState();

  const generateInitialData = useCallback(() => {
    console.log('🚀 Initializing dashboard data...');
    setLoading(true);
    
    try {
      const initialData = DashboardDataService.generateInitialData();
      setLoading(false);
      console.log('✅ Dashboard data initialized successfully');
      return initialData;
    } catch (error) {
      console.error('❌ Failed to initialize dashboard data:', error);
      setError('Failed to load dashboard data');
      setLoading(false);
      return null;
    }
  }, [setLoading, setError]);

  return {
    generateInitialData
  };
};
