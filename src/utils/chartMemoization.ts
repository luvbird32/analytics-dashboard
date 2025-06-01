
import { memo } from 'react';

/**
 * Chart memoization utilities for performance optimization
 */

// Generic type for chart component props
interface ChartProps {
  data: any[];
  [key: string]: any;
}

/**
 * Creates a memoized version of a chart component
 * @param Component - The chart component to memoize
 * @param propsAreEqual - Optional custom comparison function
 * @returns Memoized chart component
 */
export const memoizeChart = <T extends ChartProps>(
  Component: React.ComponentType<T>,
  propsAreEqual?: (prevProps: T, nextProps: T) => boolean
) => {
  return memo(Component, propsAreEqual);
};

/**
 * Default props comparison for chart components
 * Compares data arrays and other props for equality
 */
export const defaultChartPropsAreEqual = <T extends ChartProps>(
  prevProps: T,
  nextProps: T
): boolean => {
  // Compare data arrays
  if (prevProps.data.length !== nextProps.data.length) {
    return false;
  }

  // Deep comparison of data array
  for (let i = 0; i < prevProps.data.length; i++) {
    if (JSON.stringify(prevProps.data[i]) !== JSON.stringify(nextProps.data[i])) {
      return false;
    }
  }

  // Compare other props
  const prevKeys = Object.keys(prevProps);
  const nextKeys = Object.keys(nextProps);

  if (prevKeys.length !== nextKeys.length) {
    return false;
  }

  for (const key of prevKeys) {
    if (key !== 'data' && prevProps[key] !== nextProps[key]) {
      return false;
    }
  }

  return true;
};

/**
 * Creates a memoized chart with default comparison
 */
export const createMemoizedChart = <T extends ChartProps>(
  Component: React.ComponentType<T>
) => {
  return memoizeChart(Component, defaultChartPropsAreEqual);
};
