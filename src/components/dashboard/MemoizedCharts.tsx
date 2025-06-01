
import React, { memo } from 'react';
import { SalesChart } from './SalesChart';
import { TrafficChart } from './TrafficChart';
import { LiveChart } from './LiveChart';
import { MetricCard } from './MetricCard';
import { TreemapChart } from './charts/TreemapChart';
import { FunnelChart } from './charts/FunnelChart';
import { GaugeChart } from './charts/GaugeChart';
import { CandlestickChart } from './charts/CandlestickChart';
import { DonutChart } from './charts/DonutChart';
import { SankeyChart } from './charts/SankeyChart';
import { CryptoChart } from './charts/CryptoChart';
import { BarChart } from './charts/BarChart';
import { ScatterChart } from './charts/ScatterChart';
import { ErrorBoundary } from '../ErrorBoundary';

/**
 * Memoized Sales Chart for optimized rendering
 */
export const MemoizedSalesChart = memo(SalesChart, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

/**
 * Memoized Traffic Chart for optimized rendering
 */
export const MemoizedTrafficChart = memo(TrafficChart, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

/**
 * Memoized Live Chart for optimized rendering
 */
export const MemoizedLiveChart = memo(LiveChart, (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    prevProps.isLive === nextProps.isLive
  );
});

/**
 * Memoized Metric Card for optimized rendering
 */
export const MemoizedMetricCard = memo(MetricCard, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.metric) === JSON.stringify(nextProps.metric);
});

/**
 * Memoized chart components with error boundaries
 */
export const MemoizedTreemapChart = memo(({ data }: any) => (
  <ErrorBoundary>
    <TreemapChart data={data} />
  </ErrorBoundary>
));

export const MemoizedFunnelChart = memo(({ data }: any) => (
  <ErrorBoundary>
    <FunnelChart data={data} />
  </ErrorBoundary>
));

export const MemoizedGaugeChart = memo(({ data }: any) => (
  <ErrorBoundary>
    <GaugeChart data={data} />
  </ErrorBoundary>
));

export const MemoizedCandlestickChart = memo(({ data }: any) => (
  <ErrorBoundary>
    <CandlestickChart data={data} />
  </ErrorBoundary>
));

export const MemoizedDonutChart = memo(({ data }: any) => (
  <ErrorBoundary>
    <DonutChart data={data} />
  </ErrorBoundary>
));

export const MemoizedSankeyChart = memo(({ data }: any) => (
  <ErrorBoundary>
    <SankeyChart data={data} />
  </ErrorBoundary>
));

export const MemoizedCryptoChart = memo(({ data, symbol }: any) => (
  <ErrorBoundary>
    <CryptoChart data={data} symbol={symbol} />
  </ErrorBoundary>
));

export const MemoizedBarChart = memo(({ data }: any) => (
  <ErrorBoundary>
    <BarChart data={data} />
  </ErrorBoundary>
));

export const MemoizedScatterChart = memo(({ data }: any) => (
  <ErrorBoundary>
    <ScatterChart data={data} />
  </ErrorBoundary>
));

// Set display names for better debugging
MemoizedSalesChart.displayName = 'MemoizedSalesChart';
MemoizedTrafficChart.displayName = 'MemoizedTrafficChart';
MemoizedLiveChart.displayName = 'MemoizedLiveChart';
MemoizedMetricCard.displayName = 'MemoizedMetricCard';
MemoizedTreemapChart.displayName = 'MemoizedTreemapChart';
MemoizedFunnelChart.displayName = 'MemoizedFunnelChart';
MemoizedGaugeChart.displayName = 'MemoizedGaugeChart';
MemoizedCandlestickChart.displayName = 'MemoizedCandlestickChart';
MemoizedDonutChart.displayName = 'MemoizedDonutChart';
MemoizedSankeyChart.displayName = 'MemoizedSankeyChart';
MemoizedCryptoChart.displayName = 'MemoizedCryptoChart';
MemoizedBarChart.displayName = 'MemoizedBarChart';
MemoizedScatterChart.displayName = 'MemoizedScatterChart';
