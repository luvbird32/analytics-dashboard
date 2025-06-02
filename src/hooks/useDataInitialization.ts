
import { useCallback } from 'react';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useSocialCryptoData } from './useSocialCryptoData';
import { useDashboardState } from './useDashboardState';

/**
 * Hook for managing data initialization with mock data
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
      console.log('📊 Generating metrics data...');
      generateInitialMetrics();
      
      console.log('📈 Generating charts data...');
      generateInitialCharts();
      
      console.log('📱 Generating social/crypto data...');
      generateInitialSocialCrypto();

      console.log('✅ All mock data loaded successfully');
    } catch (error) {
      console.error('❌ Error loading mock dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      // Small delay to ensure state updates are processed
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
