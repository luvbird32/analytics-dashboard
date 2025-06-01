
import { memo } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

/**
 * Utility for creating memoized chart components with error boundaries
 */
export const createMemoizedChart = <T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  displayName: string,
  compareProps?: (prevProps: T, nextProps: T) => boolean
) => {
  const MemoizedComponent = memo((props: T) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  ), compareProps);

  MemoizedComponent.displayName = `Memoized${displayName}`;
  
  return MemoizedComponent;
};

/**
 * Default comparison function for chart data
 */
export const defaultChartComparison = (prevProps: any, nextProps: any) => {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
};

/**
 * Comparison function for live charts with isLive prop
 */
export const liveChartComparison = (prevProps: any, nextProps: any) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    prevProps.isLive === nextProps.isLive
  );
};
