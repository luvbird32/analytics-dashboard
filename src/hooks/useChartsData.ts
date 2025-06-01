
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
import { DataGeneratorService } from '@/services/dataGenerator';

/**
 * Hook for managing chart data
 */
export const useChartsData = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
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

  /**
   * Generates initial chart data
   */
  const generateInitialCharts = useCallback(() => {
    console.log('📊 Generating chart data...');
    
    setSalesData(DataGeneratorService.generateSalesData());
    setTrafficData(DataGeneratorService.generateTrafficData());
    setRadarData(DataGeneratorService.generateRadarData());
    setAreaData(DataGeneratorService.generateAreaData());

    // Generate heatmap data
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
    setHeatmapData(heatmapPoints);

    // Generate advanced chart data
    setTreemapData(DataGeneratorService.generateTreemapData());
    setScatterData(DataGeneratorService.generateScatterData());
    setFunnelData(DataGeneratorService.generateFunnelData());
    setGaugeData(DataGeneratorService.generateGaugeData());
    setSankeyData(DataGeneratorService.generateSankeyData());
    setCandlestickData(DataGeneratorService.generateCandlestickData());
    setDonutData(DataGeneratorService.generateDonutData());
    setBarData(DataGeneratorService.generateBarData());
  }, []);

  /**
   * Updates traffic data occasionally
   */
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
