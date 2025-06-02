
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

  const generateInitialData = useCallback(async () => {
    console.log('🚀 Initializing comprehensive dashboard data...');
    
    try {
      // Initialize data sources sequentially to avoid React hook conflicts
      await new Promise(resolve => {
        generateInitialMetrics();
        setTimeout(resolve, 10);
      });
      
      await new Promise(resolve => {
        generateInitialCharts();
        setTimeout(resolve, 10);
      });
      
      await new Promise(resolve => {
        generateInitialSocialCrypto();
        setTimeout(resolve, 10);
      });
      
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
