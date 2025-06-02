
import { useMemo } from 'react';
import { SanitizationService } from '@/services/security/sanitizationService';

/**
 * Focused hook for managing and sanitizing dashboard data
 */
export const useDashboardDataManager = (rawData: any) => {
  const sanitizedData = useMemo(() => {
    if (!rawData) return {};

    return {
      metrics: rawData.metrics ? SanitizationService.sanitizeChartData(rawData.metrics) : [],
      performanceMetrics: rawData.performanceMetrics ? SanitizationService.sanitizeChartData(rawData.performanceMetrics) : [],
      salesData: rawData.salesData ? SanitizationService.sanitizeChartData(rawData.salesData) : [],
      trafficData: rawData.trafficData ? SanitizationService.sanitizeChartData(rawData.trafficData) : [],
      areaData: rawData.areaData ? SanitizationService.sanitizeChartData(rawData.areaData) : [],
      radarData: rawData.radarData ? SanitizationService.sanitizeChartData(rawData.radarData) : [],
      treemapData: rawData.treemapData ? SanitizationService.sanitizeChartData(rawData.treemapData) : [],
      scatterData: rawData.scatterData ? SanitizationService.sanitizeChartData(rawData.scatterData) : [],
      funnelData: rawData.funnelData ? SanitizationService.sanitizeChartData(rawData.funnelData) : [],
      gaugeData: rawData.gaugeData ? SanitizationService.sanitizeChartData(rawData.gaugeData) : [],
      sankeyData: rawData.sankeyData || { nodes: [], links: [] },
      candlestickData: rawData.candlestickData ? SanitizationService.sanitizeChartData(rawData.candlestickData) : [],
      donutData: rawData.donutData ? SanitizationService.sanitizeChartData(rawData.donutData) : [],
      barData: rawData.barData ? SanitizationService.sanitizeChartData(rawData.barData) : [],
      sentimentData: rawData.sentimentData ? SanitizationService.sanitizeChartData(rawData.sentimentData) : [],
      engagementData: rawData.engagementData ? SanitizationService.sanitizeChartData(rawData.engagementData) : [],
      cryptoData: rawData.cryptoData ? SanitizationService.sanitizeChartData(rawData.cryptoData) : [],
      hashtagData: rawData.hashtagData ? SanitizationService.sanitizeChartData(rawData.hashtagData) : []
    };
  }, [rawData]);

  return sanitizedData;
};
