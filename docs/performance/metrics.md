# 📊 Performance Metrics

Core performance indicators and measurement strategies.

## Performance Service

```typescript
// src/services/performance/performanceService.ts
interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number;          // Largest Contentful Paint
  fid: number;          // First Input Delay
  cls: number;          // Cumulative Layout Shift
  
  // Loading Performance
  ttfb: number;         // Time to First Byte
  fcp: number;          // First Contentful Paint
  tti: number;          // Time to Interactive
  
  // Runtime Performance
  renderTime: number;   // Component render time
  bundleSize: number;   // JavaScript bundle size
  memoryUsage: number;  // Memory consumption
  
  // User Experience
  responseTime: number; // Average response time
  errorRate: number;    // Error occurrence rate
  cacheHitRate: number; // Cache effectiveness
}

class PerformanceService {
  private metrics: PerformanceMetrics;
  private observer: PerformanceObserver | null = null;

  constructor() {
    this.metrics = this.initializeMetrics();
    this.setupPerformanceObserver();
    this.startMemoryMonitoring();
  }

  /**
   * Measure component render performance
   */
  measureRender<T>(componentName: string, renderFunction: () => T): T {
    const startTime = performance.now();
    const result = renderFunction();
    const endTime = performance.now();
    
    performance.mark(`${componentName}-render-start`);
    performance.mark(`${componentName}-render-end`);
    performance.measure(
      `component-render-${componentName}`,
      `${componentName}-render-start`,
      `${componentName}-render-end`
    );

    return result;
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Generate performance report
   */
  generateReport(): PerformanceReport {
    const metrics = this.getMetrics();
    
    return {
      score: this.calculatePerformanceScore(metrics),
      metrics,
      recommendations: this.generateRecommendations(metrics),
      timestamp: Date.now()
    };
  }

  private calculatePerformanceScore(metrics: PerformanceMetrics): number {
    // Weight different metrics
    const weights = {
      lcp: 0.25,
      fid: 0.25,
      cls: 0.25,
      ttfb: 0.1,
      renderTime: 0.15
    };

    // Scoring thresholds (good/poor)
    const thresholds = {
      lcp: [2500, 4000],
      fid: [100, 300],
      cls: [0.1, 0.25],
      ttfb: [800, 1800],
      renderTime: [100, 300]
    };

    let score = 0;
    
    Object.entries(weights).forEach(([metric, weight]) => {
      const value = metrics[metric as keyof PerformanceMetrics] as number;
      const [good, poor] = thresholds[metric as keyof typeof thresholds];
      
      let metricScore = 100;
      if (value > poor) metricScore = 0;
      else if (value > good) metricScore = 50;
      
      score += metricScore * weight;
    });

    return Math.round(score);
  }
}

export const performanceService = new PerformanceService();
```

## Web Vitals Monitoring

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

class WebVitalsService {
  private vitals: WebVitalMetric[] = [];

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    // Core Web Vitals
    getCLS(this.onVital.bind(this));
    getFID(this.onVital.bind(this));
    getLCP(this.onVital.bind(this));

    // Other important metrics
    getFCP(this.onVital.bind(this));
    getTTFB(this.onVital.bind(this));
  }

  private onVital(metric: any): void {
    const vital: WebVitalMetric = {
      name: metric.name,
      value: metric.value,
      rating: this.getRating(metric.name, metric.value),
      id: metric.id,
      timestamp: Date.now()
    };

    this.vitals.push(vital);
    this.reportVital(vital);
  }
}

export const webVitalsService = new WebVitalsService();
```

## Performance Monitoring Hook

```typescript
export const usePerformanceMonitor = (componentName: string) => {
  const renderStartRef = useRef<number>();

  const trackRenderStart = useCallback(() => {
    renderStartRef.current = performance.now();
  }, []);

  const trackRenderEnd = useCallback(() => {
    if (renderStartRef.current) {
      const renderTime = performance.now() - renderStartRef.current;
      
      // Log performance warning if render is slow
      if (renderTime > 16) { // 60fps threshold
        console.warn(
          `[Performance] ${componentName} render took ${renderTime.toFixed(2)}ms`
        );
      }
    }
  }, [componentName]);

  return { trackRenderStart, trackRenderEnd };
};
```
