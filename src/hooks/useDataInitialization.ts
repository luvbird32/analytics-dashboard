
import { useCallback } from 'react';
import { useDashboardState } from './useDashboardState';

/**
 * Hook for managing data initialization with mock data
 */
export const useDataInitialization = () => {
  const { setLoading, setError } = useDashboardState();

  const generateInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🚀 Generating comprehensive dashboard data with mock data...');
      
      // Simulate data loading
      await new Promise(resolve => setTimeout(resolve, 100));

      console.log('✅ Mock dashboard data loaded successfully');
    } catch (error) {
      console.error('❌ Error loading mock dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      // Small delay to ensure state updates are processed
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, [setLoading, setError]);

  return {
    generateInitialData
  };
};
