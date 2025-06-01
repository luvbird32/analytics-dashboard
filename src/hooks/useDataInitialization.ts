
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
  
  // Get the generation functions from the data hooks
  const metricsHook = useMetricsData();
  const chartsHook = useChartsData();
  const socialCryptoHook = useSocialCryptoData();

  const generateInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🚀 Generating comprehensive dashboard data...');
      
      await Promise.all([
        metricsHook.generateInitialMetrics(),
        chartsHook.generateInitialCharts(),
        socialCryptoHook.generateInitialSocialCrypto()
      ]);

      console.log('✅ Comprehensive dashboard data generated successfully');
    } catch (error) {
      console.error('❌ Error generating dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [metricsHook.generateInitialMetrics, chartsHook.generateInitialCharts, socialCryptoHook.generateInitialSocialCrypto, setLoading, setError]);

  return {
    generateInitialData
  };
};
