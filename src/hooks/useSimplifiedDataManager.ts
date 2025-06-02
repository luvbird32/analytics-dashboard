
import { useMemo } from 'react';
import { SanitizationService } from '@/services/security/sanitizationService';

/**
 * Simplified data management hook
 */
export const useSimplifiedDataManager = (rawData: any) => {
  const sanitizedData = useMemo(() => {
    if (!rawData) return {};

    return {
      metrics: SanitizationService.sanitizeChartData(rawData.metrics || []),
      performanceMetrics: SanitizationService.sanitizeChartData(rawData.performanceMetrics || []),
      salesData: SanitizationService.sanitizeChartData(rawData.salesData || []),
      trafficData: SanitizationService.sanitizeChartData(rawData.trafficData || [])
    };
  }, [rawData]);

  return sanitizedData;
};
