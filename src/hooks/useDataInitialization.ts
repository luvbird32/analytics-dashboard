
import { useCallback } from 'react';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useSocialCryptoData } from './useSocialCryptoData';
import { useDashboardState } from './useDashboardState';

/**
 * Hook for managing data initialization
 */
export const useDataInitialization = () => {
  const { setLoading, setError } = useDashboardState();
  const { generateInitialMetrics } = useMetricsData();
  const { generateInitialCharts } = useChartsData();
  const { generateInitialSocialCrypto } = useSocialCryptoData();

  const generateInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🚀 Generating comprehensive dashboard data...');
      
      await Promise.all([
        generateInitialMetrics(),
        generateInitialCharts(),
        generateInitialSocialCrypto()
      ]);

      console.log('✅ Comprehensive dashboard data generated successfully');
    } catch (error) {
      console.error('❌ Error generating dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [generateInitialMetrics, generateInitialCharts, generateInitialSocialCrypto, setLoading, setError]);

  return {
    generateInitialData
  };
};
