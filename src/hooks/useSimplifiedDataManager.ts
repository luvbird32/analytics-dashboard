
import { useMemo } from 'react';

/**
 * Simplified data manager hook for sanitizing and processing dashboard data
 */
export const useSimplifiedDataManager = (rawData: any) => {
  const sanitizedData = useMemo(() => {
    console.log('🔧 Processing raw data in useSimplifiedDataManager:', rawData);
    
    if (!rawData) {
      console.log('⚠️ No raw data provided to useSimplifiedDataManager');
      return {
        metrics: [],
        performanceMetrics: [],
        salesData: [],
        trafficData: [],
        areaData: [],
        radarData: [],
        sentimentData: [],
        engagementData: [],
        cryptoData: [],
        hashtagData: [],
        treemapData: [],
        scatterData: [],
        funnelData: [],
        gaugeData: [],
        sankeyData: { nodes: [], links: [] },
        candlestickData: [],
        donutData: [],
        barData: []
      };
    }
    
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
    
    console.log('🔧 Sanitized data result:', {
      metricsLength: result.metrics.length,
      salesDataLength: result.salesData.length,
      trafficDataLength: result.trafficData.length,
      areaDataLength: result.areaData.length,
      radarDataLength: result.radarData.length,
      treemapDataLength: result.treemapData.length,
      scatterDataLength: result.scatterData.length,
      funnelDataLength: result.funnelData.length,
      gaugeDataLength: result.gaugeData.length,
      candlestickDataLength: result.candlestickData.length,
      donutDataLength: result.donutData.length,
      barDataLength: result.barData.length,
      sankeyNodesLength: result.sankeyData.nodes.length,
      sankeyLinksLength: result.sankeyData.links.length
    });
    
    return result;
  }, [rawData]);

  return sanitizedData;
};
