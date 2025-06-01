
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
  const metricsHook = useMetricsData();
  const chartsHook = useChartsData();
  const socialCryptoHook = useSocialCryptoData();

  const generateInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🚀 Generating comprehensive dashboard data with mock data...');
      
      // Force synchronous execution to ensure data is loaded
      metricsHook.generateInitialMetrics();
      chartsHook.generateInitialCharts();
      socialCryptoHook.generateInitialSocialCrypto();

      console.log('✅ Mock dashboard data loaded successfully');
      console.log('📊 Metrics data:', metricsHook);
      console.log('📈 Charts data:', chartsHook);
    } catch (error) {
      console.error('❌ Error loading mock dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      // Small delay to ensure state updates are processed
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, [metricsHook.generateInitialMetrics, chartsHook.generateInitialCharts, socialCryptoHook.generateInitialSocialCrypto, setLoading, setError]);

  return {
    generateInitialData
  };
};
