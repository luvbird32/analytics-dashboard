
import { useState, useCallback } from 'react';
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

  console.log('🔍 useChartsData - Current State:', {
    salesDataLength: salesData.length,
    trafficDataLength: trafficData.length,
    areaDataLength: areaData.length,
    radarDataLength: radarData.length,
    salesData: salesData,
    trafficData: trafficData
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
    console.log('📊 Loading chart data with specialized services...');
    
    // Use mock data for sales and traffic
    console.log('📊 Setting sales data:', mockSalesData);
    console.log('📊 Setting traffic data:', mockTrafficData);
    setSalesData([...mockSalesData]);
    setTrafficData([...mockTrafficData]);
    
    // Use specialized services for other charts
    const radarChartData = BasicChartsService.generateRadarData();
    const areaChartData = BasicChartsService.generateAreaData();
    
    console.log('📊 Generated radar data:', radarChartData);
    console.log('📊 Generated area data:', areaChartData);
    
    setRadarData(radarChartData);
    setAreaData(areaChartData);
    setHeatmapData(generateHeatmapData());

    // Advanced charts
    setTreemapData(AdvancedChartsService.generateTreemapData());
    setScatterData(AdvancedChartsService.generateScatterData());
    setFunnelData(AdvancedChartsService.generateFunnelData());
    setGaugeData(AdvancedChartsService.generateGaugeData());

    // Financial charts
    setSankeyData(FinancialChartsService.generateSankeyData());
    setCandlestickData(FinancialChartsService.generateCandlestickData());
    setDonutData(FinancialChartsService.generateDonutData());
    setBarData(FinancialChartsService.generateBarData());
    
    console.log('✅ All chart data loaded successfully');
  }, [generateHeatmapData]);

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
