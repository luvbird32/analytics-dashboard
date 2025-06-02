
import { useCallback } from 'react';
import { useMetricsData } from './useMetricsData';
import { useChartsData } from './useChartsData';
import { useSocialCryptoData } from './useSocialCryptoData';

/**
 * Hook for initializing dashboard data
 */
export const useDataInitialization = () => {
  const { generateInitialMetrics } = useMetricsData();
  const { generateInitialCharts } = useChartsData();
  const { generateInitialSocialCrypto } = useSocialCryptoData();

  const generateInitialData = useCallback(() => {
    console.log('🚀 Initializing comprehensive dashboard data...');
    
    try {
      // Initialize data sources synchronously to avoid React hook conflicts
      generateInitialMetrics();
      generateInitialCharts();
      generateInitialSocialCrypto();
      
      console.log('✅ Dashboard data initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize dashboard data:', error);
      return false;
    }
  }, [generateInitialMetrics, generateInitialCharts, generateInitialSocialCrypto]);

  return {
    generateInitialData
  };
};
