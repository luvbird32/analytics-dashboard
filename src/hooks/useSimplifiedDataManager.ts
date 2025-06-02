
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
      trafficData: SanitizationService.sanitizeChartData(rawData.trafficData || []),
      areaData: SanitizationService.sanitizeChartData(rawData.areaData || []),
      radarData: SanitizationService.sanitizeChartData(rawData.radarData || []),
      treemapData: SanitizationService.sanitizeChartData(rawData.treemapData || []),
      scatterData: SanitizationService.sanitizeChartData(rawData.scatterData || []),
      funnelData: SanitizationService.sanitizeChartData(rawData.funnelData || []),
      gaugeData: SanitizationService.sanitizeChartData(rawData.gaugeData || []),
      sankeyData: rawData.sankeyData || { nodes: [], links: [] },
      candlestickData: SanitizationService.sanitizeChartData(rawData.candlestickData || []),
      donutData: SanitizationService.sanitizeChartData(rawData.donutData || []),
      barData: SanitizationService.sanitizeChartData(rawData.barData || []),
      sentimentData: SanitizationService.sanitizeChartData(rawData.sentimentData || []),
      engagementData: SanitizationService.sanitizeChartData(rawData.engagementData || []),
      cryptoData: SanitizationService.sanitizeChartData(rawData.cryptoData || []),
      hashtagData: SanitizationService.sanitizeChartData(rawData.hashtagData || [])
    };
  }, [rawData]);

  return sanitizedData;
};
