
# Architecture Guide

This document outlines the technical architecture and design decisions for the Analytics Dashboard.

## Technology Stack

### Core Technologies
- **React 18**: UI library with hooks and functional components
- **TypeScript**: Type safety and developer experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework

### UI Components
- **shadcn/ui**: High-quality, accessible component library
- **Radix UI**: Unstyled, accessible primitives
- **Lucide React**: Beautiful, customizable icons
- **Recharts**: Composable charting library

### State Management
- **React Query (@tanstack/react-query)**: Server state management
- **React Hooks**: Local component state
- **Custom Hooks**: Shared business logic

### Storage & Persistence
- **use-local-storage-state**: React hooks for localStorage
- **idb**: Promise-based IndexedDB wrapper
- **localforage**: Unified storage API (IndexedDB, localStorage, WebSQL)

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Base UI components (shadcn/ui)
│   └── dashboard/          # Dashboard-specific components
│       ├── charts/         # Chart components
│       ├── filters/        # Filter components
│       └── sections/       # Dashboard sections
├── hooks/                  # Custom React hooks
├── services/               # Business logic and data services
│   ├── core/              # Core business services
│   ├── charts/            # Chart data services
│   ├── crypto/            # Cryptocurrency data
│   └── social/            # Social media analytics
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
└── pages/                  # Page components
```

## Storage Architecture

### Three-Tier Storage Strategy

```typescript
// Tier 1: localStorage for simple preferences
const usePreferences = () => {
  const [prefs, setPrefs] = useLocalStorageState('dashboard-prefs', {
    defaultValue: { theme: 'light', filters: {} }
  });
  return { prefs, setPrefs };
};

// Tier 2: IndexedDB for structured data
const useChartCache = () => {
  const saveChartData = async (chartId: string, data: any) => {
    const db = await openDB('charts', 1);
    await db.put('chartData', { id: chartId, data, timestamp: Date.now() });
  };
  return { saveChartData };
};

// Tier 3: localforage for unified storage
localforage.config({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  name: 'analytics-dashboard'
});
```

### Storage Use Cases

**localStorage** (via use-local-storage-state):
- User preferences (theme, language)
- Filter settings
- UI state persistence
- Simple configuration

**IndexedDB** (via idb):
- Chart data caching
- Large datasets
- Complex queries
- Offline data storage

**localforage** (unified API):
- Cross-browser compatibility
- Automatic driver selection
- Large file storage
- Progressive enhancement

## Component Architecture

### Section-Based Organization

The dashboard is organized into logical sections:

```typescript
// Main sections
├── MainChartsSection        # Live metrics & notifications
├── SalesTrafficSection      # Sales & traffic analytics
├── AdvancedAnalyticsSection # Area, radar, sankey charts
├── CryptocurrencySection    # Crypto & candlestick charts
├── SocialMediaSection       # Social analytics
└── SpecializedChartsSection # Treemap, funnel, gauge charts
```

### Hook Specialization

Custom hooks are specialized for specific domains:

```typescript
// Data management hooks
useRealTimeData()      # Main orchestration hook
useMetricsData()       # Core metrics & performance
useChartsData()        # Chart data generation
useSocialCryptoData()  # Social & crypto analytics
useNotifications()     # Notification system

// Storage hooks
useUserPreferences()   # Persistent user settings
useChartCache()        # Chart data caching
useOfflineData()       # Offline functionality
```

## Design Patterns

### Single Responsibility Principle

Each component has one clear purpose:

```typescript
// ✅ Good: Focused section component
const SalesTrafficSection = ({ salesData, trafficData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <SalesChart data={salesData} />
    <TrafficChart data={trafficData} />
  </div>
);

// ✅ Good: Specialized chart component
const CryptoChart = ({ data, symbol }) => (
  <Card>
    <CardHeader>
      <CardTitle>{symbol} Price Analysis</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          {/* Chart implementation */}
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
```

### Composition over Inheritance

Build complex UIs through composition:

```typescript
const Dashboard = () => (
  <div className="space-y-8">
    <DashboardHeader />
    <MainChartsSection {...mainData} />
    <SalesTrafficSection {...salesTrafficData} />
    <AdvancedAnalyticsSection {...advancedData} />
    <CryptocurrencySection {...cryptoData} />
    <SocialMediaSection {...socialData} />
    <SpecializedChartsSection {...specializedData} />
  </div>
);
```

### Custom Hooks Pattern

Encapsulate complex logic in domain-specific hooks:

```typescript
// hooks/useMetricsData.ts
export const useMetricsData = () => {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetricData[]>([]);
  
  const generateInitialMetrics = useCallback(() => {
    const newMetrics = MetricsService.generateMetrics();
    const newPerformanceMetrics = MetricsService.generatePerformanceMetrics();
    
    setMetrics(newMetrics);
    setPerformanceMetrics(newPerformanceMetrics);
  }, []);

  const updateMetrics = useCallback((isLive: boolean, addNotification: Function) => {
    if (!isLive) return;
    
    // Update logic with notifications
  }, []);
  
  return {
    metrics,
    performanceMetrics,
    generateInitialMetrics,
    updateMetrics
  };
};
```

### Service Layer Pattern

Separate business logic from UI components:

```typescript
// services/core/metricsService.ts
export class MetricsService {
  static generateMetrics(): MetricData[] {
    return Array.from({ length: 6 }, (_, i) => ({
      id: `metric-${i}`,
      label: METRIC_LABELS[i],
      value: Math.floor(Math.random() * 10000),
      change: Math.floor(Math.random() * 200) - 100,
      trend: Math.random() > 0.5 ? 'up' : 'down'
    }));
  }
  
  static calculateTrends(data: number[]): TrendData {
    // Complex trend calculation logic
  }
}
```

## Data Flow Architecture

### Unidirectional Data Flow

```
User Interaction → Section Component → Specialized Hook → Service Layer → State Update → UI Re-render
```

Example flow for real-time updates:
1. User clicks "Toggle Live Data" in DashboardHeader
2. `useRealTimeData` hook processes the action
3. Hook calls specialized hooks (`useMetricsData`, `useChartsData`)
4. Service layers generate/update data
5. Hooks update their respective states
6. Section components re-render with new data

### Storage Integration Flow

```
Component → Hook → Storage Service → Browser Storage → Persistence
```

Example for user preferences:
1. User changes filter settings
2. Component calls `setFilters` from `useRealTimeData`
3. Hook updates state and triggers storage
4. Storage service persists to localStorage
5. Next session automatically loads saved preferences

## Performance Optimizations

### Code Splitting
```typescript
// Lazy load chart components
const CryptoChart = lazy(() => import('./charts/CryptoChart'));
const SankeyChart = lazy(() => import('./charts/SankeyChart'));

// Use Suspense for loading states
<Suspense fallback={<ChartSkeleton />}>
  <CryptoChart data={cryptoData} />
</Suspense>
```

### Memoization Strategy
```typescript
// Expensive calculations
const processedMetrics = useMemo(() => {
  return MetricsService.processMetrics(rawMetrics);
}, [rawMetrics]);

// Stable callbacks
const handleFilterChange = useCallback((filters: DashboardFilters) => {
  setFilters(filters);
  saveFiltersToStorage(filters);
}, []);

// Memoized components
const MemoizedSalesChart = memo(SalesChart);
```

### Storage Optimization
```typescript
// Intelligent caching strategy
const useChartCache = () => {
  const saveWithExpiry = async (key: string, data: any, ttl: number) => {
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    };
    await localforage.setItem(key, item);
  };
  
  const getWithExpiry = async (key: string) => {
    const item = await localforage.getItem(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      await localforage.removeItem(key);
      return null;
    }
    
    return item.data;
  };
  
  return { saveWithExpiry, getWithExpiry };
};
```

## Responsive Design Strategy

### Mobile-First Approach
- Start with mobile designs
- Progressively enhance for larger screens
- Use Tailwind's responsive prefixes

### Section Responsiveness
```typescript
const AdvancedAnalyticsSection = ({ areaData, radarData, sankeyData }) => (
  <div className="space-y-8 lg:space-y-10">
    <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
      <Activity className="h-5 w-5 lg:h-6 lg:w-6" />
      Advanced Analytics
    </h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      <AreaChart data={areaData} />
      <RadarChart data={radarData} />
      <SankeyChart data={sankeyData} />
    </div>
  </div>
);
```

## Storage Security & Privacy

### Data Sanitization
```typescript
const sanitizeStorageData = (data: any): any => {
  // Remove sensitive information
  const { password, apiKey, ...safeData } = data;
  return safeData;
};
```

### Storage Quotas
```typescript
const checkStorageQuota = async (): Promise<{usage: number, quota: number}> => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return {
      usage: estimate.usage || 0,
      quota: estimate.quota || 0
    };
  }
  return { usage: 0, quota: 0 };
};
```

## Testing Strategy

### Unit Testing
- Test individual section components
- Mock storage dependencies
- Focus on business logic in hooks

### Integration Testing
- Test section interactions
- Test storage persistence
- Test data flow between hooks

### Storage Testing
```typescript
// Test localStorage integration
test('saves user preferences', async () => {
  const { result } = renderHook(() => useUserPreferences());
  
  act(() => {
    result.current.setPreferences({ theme: 'dark' });
  });
  
  expect(localStorage.getItem('dashboard-prefs')).toContain('dark');
});

// Test IndexedDB integration
test('caches chart data', async () => {
  const { result } = renderHook(() => useChartCache());
  
  await act(async () => {
    await result.current.saveChartData('test-chart', { data: 'test' });
  });
  
  const cachedData = await result.current.getChartData('test-chart');
  expect(cachedData).toEqual({ data: 'test' });
});
```

## Deployment Architecture

### Build Optimization
- TypeScript compilation
- Bundle splitting by routes and features
- Asset optimization with storage libraries
- Progressive Web App manifest

### Storage Considerations
- Service worker for offline functionality
- Cache strategies for chart data
- Storage quota management
- Cross-browser compatibility

This architecture ensures maintainable, performant, and user-friendly analytics dashboard with comprehensive storage capabilities.
