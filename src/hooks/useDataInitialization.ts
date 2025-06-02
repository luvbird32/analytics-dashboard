
import { useCallback } from 'react';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useSocialCryptoData } from './useSocialCryptoData';
import { useDashboardState } from './useDashboardState';

/**
 * Hook for managing data initialization with proper error handling
 */
export const useDataInitialization = () => {
  const { setLoading, setError } = useDashboardState();
  
  // Get the generation functions from the data hooks
  const { generateInitialMetrics } = useMetricsData();
  const { generateInitialCharts } = useChartsData();
  const { generateInitialSocialCrypto } = useSocialCryptoData();

  const generateInitialData = useCallback(async () => {
    console.log('🚀 Starting data initialization...');
    setLoading(true);
    setError(null);
    
    try {
      // Sequential initialization to avoid race conditions
      console.log('📊 Generating metrics data...');
      await Promise.resolve(generateInitialMetrics());
      
      console.log('📈 Generating charts data...');
      await Promise.resolve(generateInitialCharts());
      
      console.log('📱 Generating social/crypto data...');
      await Promise.resolve(generateInitialSocialCrypto());

      console.log('✅ All data loaded successfully');
    } catch (error) {
      console.error('❌ Error loading dashboard data:', error);
      setError('Failed to load dashboard data');
      throw error; // Re-throw to allow caller to handle
    } finally {
      // Ensure loading state is always reset
      setTimeout(() => {
        setLoading(false);
        console.log('🎯 Data initialization complete');
      }, 100);
    }
  }, [generateInitialMetrics, generateInitialCharts, generateInitialSocialCrypto, setLoading, setError]);

  return {
    generateInitialData
  };
};
