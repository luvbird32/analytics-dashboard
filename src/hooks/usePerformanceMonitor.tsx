
import { useEffect, useRef, useCallback } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  timestamp: number;
}

/**
 * Hook for monitoring component performance
 */
export const usePerformanceMonitor = (componentName: string) => {
  const renderStartTime = useRef<number>(0);
  const renderCount = useRef<number>(0);

  // Start performance measurement
  const startMeasurement = useCallback(() => {
    renderStartTime.current = performance.now();
  }, []);

  // End performance measurement and log results
  const endMeasurement = useCallback(() => {
    const renderTime = performance.now() - renderStartTime.current;
    renderCount.current += 1;

    const metrics: PerformanceMetrics = {
      renderTime,
      componentName,
      timestamp: Date.now()
    };

    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 Performance: ${componentName}`, {
        renderTime: `${renderTime.toFixed(2)}ms`,
        renderCount: renderCount.current,
        ...metrics
      });

      // Warn about slow renders
      if (renderTime > 16) {
        console.warn(`⚠️ Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    }

    return metrics;
  }, [componentName]);

  // Measure render performance
  useEffect(() => {
    startMeasurement();
    return () => {
      endMeasurement();
    };
  });

  return {
    startMeasurement,
    endMeasurement,
    renderCount: renderCount.current
  };
};

/**
 * Higher-order component for performance monitoring
 */
export const withPerformanceMonitor = <P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string
) => {
  const WrappedComponent = (props: P) => {
    const displayName = componentName || Component.displayName || Component.name;
    usePerformanceMonitor(displayName);
    
    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withPerformanceMonitor(${Component.displayName || Component.name})`;
  return WrappedComponent;
};
