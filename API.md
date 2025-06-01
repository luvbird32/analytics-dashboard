
# API Documentation

## Overview

The Analytics Dashboard uses a service-layer architecture to manage data generation, processing, and storage. This document outlines the available services, hooks, and storage APIs.

## Core Services

### MetricsService

Handles core dashboard metrics and performance data.

```typescript
import { MetricsService } from '@/services/core/metricsService';

// Generate initial metrics
const metrics = MetricsService.generateMetrics();

// Generate performance metrics
const performanceMetrics = MetricsService.generatePerformanceMetrics();

// Calculate trend indicators
const trends = MetricsService.calculateTrends(data);
```

**Methods:**
- `generateMetrics(): MetricData[]` - Generates 6 core dashboard metrics
- `generatePerformanceMetrics(): PerformanceMetricData[]` - Generates system performance data
- `calculateTrends(data: number[]): TrendData` - Calculates trend indicators

### Advanced Charts Service

Manages complex chart data generation.

```typescript
import { AdvancedChartsService } from '@/services/charts/advancedChartsService';

// Generate various chart types
const salesData = AdvancedChartsService.generateSalesData();
const trafficData = AdvancedChartsService.generateTrafficData();
const heatmapData = AdvancedChartsService.generateHeatmapData();
const radarData = AdvancedChartsService.generateRadarData();
```

**Methods:**
- `generateSalesData(): SalesData[]` - Sales trend data
- `generateTrafficData(): TrafficData[]` - Website traffic analytics
- `generateHeatmapData(): HeatmapData[]` - User interaction heatmap
- `generateRadarData(): RadarData[]` - Multi-dimensional analysis
- `generateAreaData(): AreaData[]` - Area chart data
- `generateTreemapData(): TreemapData[]` - Hierarchical data
- `generateScatterData(): ScatterData[]` - Correlation analysis
- `generateFunnelData(): FunnelData[]` - Conversion funnel
- `generateGaugeData(): GaugeData[]` - Performance gauges
- `generateSankeyData(): SankeyData` - Flow visualization
- `generateCandlestickData(): CandlestickData[]` - Financial OHLC data
- `generateDonutData(): DonutData[]` - Proportional data
- `generateBarData(): BarData[]` - Categorical comparisons

### Social Media Service

Provides social media analytics data.

```typescript
import { SocialMediaService } from '@/services/social/socialMediaService';

// Generate social analytics
const sentimentData = SocialMediaService.generateSentimentData();
const engagementData = SocialMediaService.generateEngagementData();
const hashtagData = SocialMediaService.generateHashtagData();
```

**Methods:**
- `generateSentimentData(): SentimentData[]` - Social sentiment analysis
- `generateEngagementData(): EngagementData[]` - Social engagement metrics
- `generateHashtagData(): HashtagData[]` - Trending hashtags analysis

### Crypto Service

Handles cryptocurrency data generation.

```typescript
import { CryptoService } from '@/services/crypto/cryptoService';

// Generate crypto data
const cryptoData = CryptoService.generateCryptoData();
const priceHistory = CryptoService.generatePriceHistory('BTC');
```

**Methods:**
- `generateCryptoData(): CryptoData[]` - Multi-currency price data
- `generatePriceHistory(symbol: string): PriceData[]` - Historical price data

### Notification Service

Manages dashboard notifications.

```typescript
import { NotificationService } from '@/services/notificationService';

// Generate notifications
const notification = NotificationService.createNotification('update', 'Data refreshed');

// Export functionality
await NotificationService.exportData(data, 'pdf');
```

**Methods:**
- `createNotification(type: string, message: string): NotificationData` - Create new notification
- `exportData(data: any, format: ExportFormat): Promise<void>` - Export dashboard data

## Custom Hooks

### useRealTimeData

Main orchestration hook for dashboard data management.

```typescript
import { useRealTimeData } from '@/hooks/useRealTimeData';

const {
  isLive,
  metrics,
  salesData,
  trafficData,
  notifications,
  filters,
  toggleLiveData,
  refreshData,
  setFilters,
  handleExport
} = useRealTimeData();
```

**Returns:**
- `isLive: boolean` - Real-time update status
- `metrics: MetricData[]` - Core dashboard metrics
- `salesData: SalesData[]` - Sales analytics
- `trafficData: TrafficData[]` - Traffic analytics
- `notifications: NotificationData[]` - System notifications
- `filters: DashboardFilters` - Current filter state
- `toggleLiveData: () => void` - Toggle real-time updates
- `refreshData: () => void` - Refresh all data
- `setFilters: (filters: DashboardFilters) => void` - Update filters
- `handleExport: (format: ExportFormat) => void` - Export data

### useMetricsData

Specialized hook for metrics management.

```typescript
import { useMetricsData } from '@/hooks/useMetricsData';

const {
  metrics,
  performanceMetrics,
  generateInitialMetrics,
  updateMetrics
} = useMetricsData();
```

### useChartsData

Manages chart data generation and updates.

```typescript
import { useChartsData } from '@/hooks/useChartsData';

const {
  salesData,
  trafficData,
  heatmapData,
  radarData,
  generateInitialCharts,
  updateTrafficData
} = useChartsData();
```

### useNotifications

Notification management hook.

```typescript
import { useNotifications } from '@/hooks/useNotifications';

const {
  notifications,
  addNotification,
  clearNotifications,
  markNotificationAsRead,
  handleExport
} = useNotifications();
```

### useSocialCryptoData

Social media and cryptocurrency data management.

```typescript
import { useSocialCryptoData } from '@/hooks/useSocialCryptoData';

const {
  sentimentData,
  engagementData,
  cryptoData,
  hashtagData,
  generateInitialSocialCrypto
} = useSocialCryptoData();
```

## Storage APIs

### localStorage Integration

Using `use-local-storage-state` for simple data persistence.

```typescript
import useLocalStorageState from 'use-local-storage-state';

// User preferences
const [preferences, setPreferences] = useLocalStorageState('dashboard-prefs', {
  defaultValue: {
    theme: 'light',
    filters: {},
    chartSettings: {}
  }
});

// Dashboard filters
const [filters, setFilters] = useLocalStorageState('dashboard-filters', {
  defaultValue: {
    dateRange: '30d',
    category: [],
    region: [],
    userType: []
  }
});
```

### IndexedDB Integration

Using `idb` for complex data storage.

```typescript
import { openDB } from 'idb';

// Initialize database
const initDB = async () => {
  return openDB('analytics-dashboard', 1, {
    upgrade(db) {
      // Create object stores
      if (!db.objectStoreNames.contains('chartData')) {
        db.createObjectStore('chartData', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('userSessions')) {
        db.createObjectStore('userSessions', { keyPath: 'sessionId' });
      }
    },
  });
};

// Save chart data
const saveChartData = async (chartId: string, data: any) => {
  const db = await initDB();
  await db.put('chartData', {
    id: chartId,
    data,
    timestamp: Date.now()
  });
};

// Retrieve chart data
const getChartData = async (chartId: string) => {
  const db = await initDB();
  return db.get('chartData', chartId);
};

// Clear expired data
const clearExpiredData = async (maxAge: number) => {
  const db = await initDB();
  const tx = db.transaction('chartData', 'readwrite');
  const store = tx.objectStore('chartData');
  const allData = await store.getAll();
  
  const cutoff = Date.now() - maxAge;
  for (const item of allData) {
    if (item.timestamp < cutoff) {
      await store.delete(item.id);
    }
  }
};
```

### localforage Integration

Using `localforage` for unified storage API.

```typescript
import localforage from 'localforage';

// Configure storage
localforage.config({
  driver: [
    localforage.INDEXEDDB,
    localforage.LOCALSTORAGE,
    localforage.WEBSQL
  ],
  name: 'analytics-dashboard',
  storeName: 'dashboard_data',
  description: 'Analytics Dashboard Storage'
});

// Save data with automatic driver selection
const saveData = async (key: string, data: any) => {
  try {
    await localforage.setItem(key, data);
    console.log(`Data saved to ${localforage.driver()}`);
  } catch (error) {
    console.error('Storage error:', error);
  }
};

// Retrieve data
const getData = async (key: string) => {
  try {
    return await localforage.getItem(key);
  } catch (error) {
    console.error('Retrieval error:', error);
    return null;
  }
};

// Bulk operations
const saveBulkData = async (data: Record<string, any>) => {
  const promises = Object.entries(data).map(([key, value]) =>
    localforage.setItem(key, value)
  );
  await Promise.all(promises);
};
```

## TypeScript Interfaces

### Core Data Types

```typescript
// Dashboard metrics
interface MetricData {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
}

// Performance metrics
interface PerformanceMetricData {
  id: string;
  name: string;
  value: number;
  status: 'good' | 'warning' | 'critical';
  unit: string;
}

// Chart data types
interface SalesData {
  month: string;
  sales: number;
  target: number;
}

interface TrafficData {
  source: string;
  visitors: number;
  conversionRate: number;
}

// Filter configuration
interface DashboardFilters {
  dateRange: '7d' | '30d' | '90d' | '1y';
  category: string[];
  region: string[];
  userType: string[];
}

// Notification data
interface NotificationData {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: number;
  read: boolean;
}
```

### Storage Interfaces

```typescript
// User preferences
interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  filters: DashboardFilters;
  chartSettings: {
    autoRefresh: boolean;
    refreshInterval: number;
    showAnimations: boolean;
  };
  exportSettings: {
    defaultFormat: ExportFormat;
    includeFilters: boolean;
  };
}

// Cache entry
interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl?: number;
  version?: string;
}

// Storage configuration
interface StorageConfig {
  driver: string[];
  name: string;
  storeName: string;
  description?: string;
}
```

## Error Handling

### Service Layer Errors

```typescript
try {
  const data = MetricsService.generateMetrics();
} catch (error) {
  console.error('Failed to generate metrics:', error);
  // Handle gracefully with fallback data
}
```

### Storage Errors

```typescript
const saveWithErrorHandling = async (key: string, data: any) => {
  try {
    await localforage.setItem(key, data);
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      // Handle storage quota exceeded
      await clearOldData();
      await localforage.setItem(key, data);
    } else {
      console.error('Storage error:', error);
      throw error;
    }
  }
};
```

## Performance Considerations

### Data Generation Optimization

```typescript
// Use web workers for heavy computations
const generateLargeDataset = async () => {
  const worker = new Worker('/data-generator-worker.js');
  return new Promise((resolve) => {
    worker.postMessage({ type: 'generate', size: 10000 });
    worker.onmessage = (e) => resolve(e.data);
  });
};
```

### Storage Optimization

```typescript
// Implement data compression
const saveCompressedData = async (key: string, data: any) => {
  const compressed = JSON.stringify(data);
  await localforage.setItem(key, compressed);
};

// Implement cache invalidation
const getCachedDataWithTTL = async (key: string, ttl: number) => {
  const cached = await localforage.getItem<CacheEntry>(key);
  
  if (!cached) return null;
  
  if (Date.now() - cached.timestamp > ttl) {
    await localforage.removeItem(key);
    return null;
  }
  
  return cached.data;
};
```

## Best Practices

1. **Always handle storage errors gracefully**
2. **Implement proper cache invalidation strategies**
3. **Use appropriate storage method for data size and complexity**
4. **Compress large datasets before storing**
5. **Monitor storage quota usage**
6. **Implement proper cleanup routines**
7. **Use TypeScript interfaces for type safety**
8. **Test storage functionality across browsers**
