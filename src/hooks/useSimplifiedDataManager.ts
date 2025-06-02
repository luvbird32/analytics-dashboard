
import { useMemo } from 'react';

/**
 * Simplified data manager hook for sanitizing and processing dashboard data
 */
export const useSimplifiedDataManager = (rawData: any) => {
  const sanitizedData = useMemo(() => {
    console.log('🔧 Sanitizing data:', rawData);
    
    // Simply return the raw data as sanitized - no complex processing needed
    const result = {
      metrics: rawData.metrics || [],
      performanceMetrics: rawData.performanceMetrics || [],
      salesData: rawData.salesData || [],
      trafficData: rawData.trafficData || [],
      areaData: rawData.areaData || [],
      radarData: rawData.radarData || [],
      sentimentData: rawData.sentimentData || [],
      engagementData: rawData.engagementData || [],
      cryptoData: rawData.cryptoData || [],
      hashtagData: rawData.hashtagData || [],
      treemapData: rawData.treemapData || [],
      scatterData: rawData.scatterData || [],
      funnelData: rawData.funnelData || [],
      gaugeData: rawData.gaugeData || [],
      sankeyData: rawData.sankeyData || { nodes: [], links: [] },
      candlestickData: rawData.candlestickData || [],
      donutData: rawData.donutData || [],
      barData: rawData.barData || []
    };
    
    console.log('🔧 Sanitized data result:', result);
    return result;
  }, [rawData]);

  return sanitizedData;
};
