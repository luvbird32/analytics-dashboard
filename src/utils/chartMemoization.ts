
import { memo } from 'react';

/**
 * Chart memoization utilities for performance optimization
 */

// Generic type for any component props
interface BaseProps {
  [key: string]: any;
}

// Generic type for chart component props with data array
interface ChartProps extends BaseProps {
  data: any[];
}

/**
 * Default props comparison for chart components with data arrays
 * Compares data arrays and other props for equality
 */
export const defaultChartComparison = <T extends ChartProps>(
  prevProps: T,
  nextProps: T
): boolean => {
  // Compare data arrays
  if (prevProps.data?.length !== nextProps.data?.length) {
    return false;
  }

  // Deep comparison of data array
  if (prevProps.data && nextProps.data) {
    for (let i = 0; i < prevProps.data.length; i++) {
      if (JSON.stringify(prevProps.data[i]) !== JSON.stringify(nextProps.data[i])) {
        return false;
      }
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
 * Live chart comparison that also checks for isLive prop
 */
export const liveChartComparison = <T extends ChartProps & { isLive?: boolean }>(
  prevProps: T,
  nextProps: T
): boolean => {
  // First check the default comparison
  if (!defaultChartComparison(prevProps, nextProps)) {
    return false;
  }

  // Also check isLive prop
  return prevProps.isLive === nextProps.isLive;
};

/**
 * Sankey chart comparison for components with SankeyData structure
 */
export const sankeyChartComparison = <T extends BaseProps>(
  prevProps: T,
  nextProps: T
): boolean => {
  // Compare data objects (not arrays)
  if (JSON.stringify(prevProps.data) !== JSON.stringify(nextProps.data)) {
    return false;
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
 * Generic comparison function for any props
 */
export const genericPropsComparison = <T extends BaseProps>(
  prevProps: T,
  nextProps: T
): boolean => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};

/**
 * Creates a memoized version of any component
 * @param Component - The component to memoize
 * @param componentName - Name for debugging (optional)
 * @param propsAreEqual - Optional custom comparison function
 * @returns Memoized component
 */
export const createMemoizedChart = <T extends BaseProps>(
  Component: React.ComponentType<T>,
  componentName?: string,
  propsAreEqual?: (prevProps: T, nextProps: T) => boolean
) => {
  const MemoizedComponent = memo(Component, propsAreEqual || genericPropsComparison);
  
  // Set display name for debugging
  if (componentName) {
    MemoizedComponent.displayName = `Memoized${componentName}`;
  }
  
  return MemoizedComponent;
};

/**
 * Creates a memoized chart with default comparison
 */
export const memoizeChart = <T extends BaseProps>(
  Component: React.ComponentType<T>,
  propsAreEqual?: (prevProps: T, nextProps: T) => boolean
) => {
  return memo(Component, propsAreEqual);
};

/**
 * Default props comparison for chart components (legacy)
 */
export const defaultChartPropsAreEqual = defaultChartComparison;
