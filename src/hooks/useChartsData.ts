
import { useState, useCallback, useEffect } from 'react';
import { 
  SalesData, 
  TrafficData, 
  HeatmapData, 
  RadarData, 
  AreaData,
  TreemapData,
  ScatterData,
  FunnelData,
  GaugeData,
  SankeyData,
  CandlestickData,
  DonutData,
  BarData
} from '@/types/dashboard';
import { mockSalesData, mockTrafficData } from '@/test/mocks/mockData';
import { BasicChartsService } from '@/services/charts/basicChartsService';
import { AdvancedChartsService } from '@/services/charts/advancedChartsService';
import { FinancialChartsService } from '@/services/charts/financialChartsService';

/**
 * Hook for managing chart data using specialized services
 */
export const useChartsData = () => {
  const [salesData, setSalesData] = useState<SalesData[]>(mockSalesData);
  const [trafficData, setTrafficData] = useState<TrafficData[]>(mockTrafficData);
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [radarData, setRadarData] = useState<RadarData[]>([]);
  const [areaData, setAreaData] = useState<AreaData[]>([]);
  const [treemapData, setTreemapData] = useState<TreemapData[]>([]);
  const [scatterData, setScatterData] = useState<ScatterData[]>([]);
  const [funnelData, setFunnelData] = useState<FunnelData[]>([]);
  const [gaugeData, setGaugeData] = useState<GaugeData[]>([]);
  const [sankeyData, setSankeyData] = useState<SankeyData>({ nodes: [], links: [] });
  const [candlestickData, setCandlestickData] = useState<CandlestickData[]>([]);
  const [donutData, setDonutData] = useState<DonutData[]>([]);
  const [barData, setBarData] = useState<BarData[]>([]);

  console.log('🔍 useChartsData - Current State Check:', {
    salesDataLength: salesData.length,
    trafficDataLength: trafficData.length,
    areaDataLength: areaData.length,
    radarDataLength: radarData.length,
    treemapDataLength: treemapData.length,
    scatterDataLength: scatterData.length,
    funnelDataLength: funnelData.length,
    gaugeDataLength: gaugeData.length,
    candlestickDataLength: candlestickData.length,
    donutDataLength: donutData.length,
    barDataLength: barData.length,
    sankeyNodes: sankeyData.nodes.length,
    sankeyLinks: sankeyData.links.length
  });

  const generateHeatmapData = useCallback(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const heatmapPoints: HeatmapData[] = [];
    days.forEach(day => {
      for (let hour = 0; hour < 24; hour++) {
        const baseValue = Math.sin((hour - 12) / 24 * Math.PI * 2) * 50 + 50;
        const weekendMultiplier = ['Sat', 'Sun'].includes(day) ? 0.7 : 1;
        const value = Math.max(0, baseValue * weekendMultiplier + (Math.random() - 0.5) * 20);
        heatmapPoints.push({
          day,
          hour,
          value: Math.round(value),
          intensity: value / 100
        });
      }
    });
    return heatmapPoints;
  }, []);

  const generateInitialCharts = useCallback(() => {
    console.log('📊 Starting chart data generation...');
    
    try {
      // Generate all chart data immediately
      const radarChartData = BasicChartsService.generateRadarData();
      const areaChartData = BasicChartsService.generateAreaData();
      const heatmapChartData = generateHeatmapData();
      
      const treemapChartData = AdvancedChartsService.generateTreemapData();
      const scatterChartData = AdvancedChartsService.generateScatterData();
      const funnelChartData = AdvancedChartsService.generateFunnelData();
      const gaugeChartData = AdvancedChartsService.generateGaugeData();
      
      const sankeyChartData = FinancialChartsService.generateSankeyData();
      const candlestickChartData = FinancialChartsService.generateCandlestickData();
      const donutChartData = FinancialChartsService.generateDonutData();
      const barChartData = FinancialChartsService.generateBarData();

      console.log('📊 Generated all chart data:', {
        radar: radarChartData.length,
        area: areaChartData.length,
        heatmap: heatmapChartData.length,
        treemap: treemapChartData.length,
        scatter: scatterChartData.length,
        funnel: funnelChartData.length,
        gauge: gaugeChartData.length,
        sankeyNodes: sankeyChartData.nodes.length,
        sankeyLinks: sankeyChartData.links.length,
        candlestick: candlestickChartData.length,
        donut: donutChartData.length,
        bar: barChartData.length
      });

      // Set all data at once
      setRadarData(radarChartData);
      setAreaData(areaChartData);
      setHeatmapData(heatmapChartData);
      setTreemapData(treemapChartData);
      setScatterData(scatterChartData);
      setFunnelData(funnelChartData);
      setGaugeData(gaugeChartData);
      setSankeyData(sankeyChartData);
      setCandlestickData(candlestickChartData);
      setDonutData(donutChartData);
      setBarData(barChartData);

      console.log('✅ All chart data set successfully');
    } catch (error) {
      console.error('❌ Error generating chart data:', error);
    }
  }, [generateHeatmapData]);

  // Generate data immediately on mount
  useEffect(() => {
    console.log('🚀 useChartsData mounting - generating initial data...');
    generateInitialCharts();
  }, [generateInitialCharts]);

  const updateTrafficData = useCallback((isLive: boolean) => {
    if (!isLive || Math.random() <= 0.8) return;

    setTrafficData(prev => prev.map(source => ({
      ...source,
      sessions: source.sessions + Math.floor((Math.random() - 0.5) * 100),
      growth: source.growth + (Math.random() - 0.5) * 2
    })));
  }, []);

  return {
    salesData,
    trafficData,
    heatmapData,
    radarData,
    areaData,
    treemapData,
    scatterData,
    funnelData,
    gaugeData,
    sankeyData,
    candlestickData,
    donutData,
    barData,
    generateInitialCharts,
    updateTrafficData
  };
};
