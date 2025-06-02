
import React from 'react';
import { SalesChart } from './SalesChart';
import { TrafficChart } from './TrafficChart';
import { LiveChart } from './LiveChart';
import { MetricCard } from './MetricCard';
import { 
  TreemapChart,
  FunnelChart,
  GaugeChart,
  CandlestickChart,
  DonutChart,
  SankeyChart,
  CryptoChart,
  CustomBarChart,
  ScatterChart
} from './charts';
import { createMemoizedChart, defaultChartComparison, liveChartComparison, sankeyChartComparison } from '@/utils/chartMemoization';

/**
 * Memoized chart components with error boundaries
 */
export const MemoizedSalesChart = createMemoizedChart(
  SalesChart, 
  'SalesChart', 
  defaultChartComparison
);

export const MemoizedTrafficChart = createMemoizedChart(
  TrafficChart, 
  'TrafficChart', 
  defaultChartComparison
);

export const MemoizedLiveChart = createMemoizedChart(
  LiveChart, 
  'LiveChart', 
  liveChartComparison
);

export const MemoizedMetricCard = createMemoizedChart(
  MetricCard, 
  'MetricCard', 
  (prevProps, nextProps) => JSON.stringify(prevProps.metric) === JSON.stringify(nextProps.metric)
);

export const MemoizedTreemapChart = createMemoizedChart(TreemapChart, 'TreemapChart', defaultChartComparison);
export const MemoizedFunnelChart = createMemoizedChart(FunnelChart, 'FunnelChart', defaultChartComparison);
export const MemoizedGaugeChart = createMemoizedChart(GaugeChart, 'GaugeChart', defaultChartComparison);
export const MemoizedCandlestickChart = createMemoizedChart(CandlestickChart, 'CandlestickChart', defaultChartComparison);
export const MemoizedDonutChart = createMemoizedChart(DonutChart, 'DonutChart', defaultChartComparison);
export const MemoizedSankeyChart = createMemoizedChart(SankeyChart, 'SankeyChart', sankeyChartComparison);
export const MemoizedCryptoChart = createMemoizedChart(
  CryptoChart, 
  'CryptoChart', 
  (prevProps, nextProps) => (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    prevProps.symbol === nextProps.symbol
  )
);
export const MemoizedCustomBarChart = createMemoizedChart(CustomBarChart, 'CustomBarChart', defaultChartComparison);
export const MemoizedScatterChart = createMemoizedChart(ScatterChart, 'ScatterChart', defaultChartComparison);
