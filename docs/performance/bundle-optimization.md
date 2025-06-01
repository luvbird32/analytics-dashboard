
# 📦 Bundle Optimization

Strategies for optimizing JavaScript bundle size and loading performance.

## Code Splitting

### Route-based Code Splitting

```typescript
// src/utils/lazyLoading.ts
import { lazy, ComponentType } from 'react';

export const createLazyComponent = <T extends ComponentType<any>>(
  importFunction: () => Promise<{ default: T }>,
  options: {
    fallback?: React.ComponentType;
    preload?: boolean;
  } = {}
) => {
  const LazyComponent = lazy(importFunction);

  // Preload if requested
  if (options.preload) {
    setTimeout(() => {
      importFunction().catch(() => {
        // Ignore preload errors
      });
    }, 100);
  }

  return LazyComponent;
};

// Usage
export const DashboardPage = createLazyComponent(
  () => import('../pages/Dashboard'),
  { preload: true }
);

export const AnalyticsPage = createLazyComponent(
  () => import('../pages/Analytics')
);
```

### Component-based Code Splitting

```typescript
// Component splitting for large features
export const AdvancedCharts = createLazyComponent(
  () => import('../components/charts/AdvancedCharts')
);

export const DataTable = createLazyComponent(
  () => import('../components/DataTable')
);

// Conditional loading
export const loadAdvancedFeatures = async () => {
  if (import.meta.env.VITE_ENABLE_ADVANCED_FEATURES === 'true') {
    const { AdvancedAnalytics } = await import('../components/AdvancedAnalytics');
    return AdvancedAnalytics;
  }
  return null;
};
```

## Tree Shaking

### Optimized Imports

```typescript
// ✅ Good: Import only what you need
import { format } from 'date-fns';
import { debounce } from 'lodash-es';

// ❌ Bad: Imports entire library
// import * as dateFns from 'date-fns';
// import _ from 'lodash';

// ✅ Good: Modular utility functions
export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const createDebouncedFunction = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  return debounce(func, delay) as T;
};
```

### Dynamic Imports

```typescript
// Dynamic imports for large dependencies
export const loadChartLibrary = async () => {
  const { default: Chart } = await import('chart.js/auto');
  return Chart;
};

// Feature-based loading
export const loadReportingFeatures = async () => {
  const [
    { ReportGenerator },
    { ExportService },
    { AnalyticsEngine }
  ] = await Promise.all([
    import('../features/reporting/ReportGenerator'),
    import('../services/ExportService'),
    import('../features/analytics/AnalyticsEngine')
  ]);

  return { ReportGenerator, ExportService, AnalyticsEngine };
};
```

## Bundle Analysis

```typescript
interface BundleAnalysis {
  totalSize: number;
  chunks: ChunkInfo[];
  dependencies: DependencyInfo[];
  recommendations: string[];
}

class BundleAnalyzer {
  async analyzeBundleComposition(): Promise<BundleAnalysis> {
    const chunks = await this.getChunkInfo();
    const dependencies = await this.getDependencyInfo();
    const totalSize = chunks.reduce((sum, chunk) => sum + chunk.size, 0);

    return {
      totalSize,
      chunks,
      dependencies,
      recommendations: this.generateBundleRecommendations(chunks, dependencies)
    };
  }

  private generateBundleRecommendations(
    chunks: ChunkInfo[], 
    dependencies: DependencyInfo[]
  ): string[] {
    const recommendations: string[] = [];

    // Check for large dependencies
    dependencies.forEach(dep => {
      if (dep.size > 50000 && dep.usage === 'optional') {
        recommendations.push(`Consider replacing ${dep.name} with a lighter alternative`);
      }
    });

    // Check for large chunks
    chunks.forEach(chunk => {
      if (chunk.size > 200000) {
        recommendations.push(`Split ${chunk.name} chunk further for better caching`);
      }
    });

    return recommendations;
  }
}
```

## Build Configuration

```javascript
// vite.config.ts optimizations
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts', 'chart.js'],
          utils: ['date-fns', 'lodash-es']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'recharts']
  }
});
```
