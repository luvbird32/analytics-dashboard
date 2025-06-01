
# API Documentation

This document describes the data structures and mock services used in the Analytics Dashboard.

## Overview

The dashboard uses mock data generators that simulate real-time analytics data. In a production environment, these would be replaced with actual API calls to your analytics backend.

## Data Services

### Core Metrics Service

Located in `src/services/core/metricsService.ts`

```typescript
interface Metric {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: LucideIcon;
}
```

**Methods:**
- `generateMetrics()`: Returns current dashboard metrics
- `generatePerformanceMetrics()`: Returns system performance data

### Charts Data Service

Located in `src/services/charts/advancedChartsService.ts`

**Chart Types Supported:**
- Line Charts (time series data)
- Bar Charts (categorical data)
- Area Charts (filled time series)
- Pie/Donut Charts (proportional data)
- Scatter Charts (correlation data)
- Radar Charts (multi-dimensional data)
- Treemap Charts (hierarchical data)
- Funnel Charts (conversion data)
- Gauge Charts (single value indicators)
- Sankey Charts (flow visualization)
- Candlestick Charts (financial data)

### Social Media Service

Located in `src/services/social/socialMediaService.ts`

```typescript
interface SentimentData {
  time: string;
  positive: number;
  negative: number;
  neutral: number;
}

interface HashtagData {
  hashtag: string;
  mentions: number;
  engagement: number;
  reach: number;
}
```

### Crypto Service

Located in `src/services/crypto/cryptoService.ts`

```typescript
interface CryptoData {
  time: string;
  bitcoin: number;
  ethereum: number;
  cardano: number;
  solana: number;
}
```

## Real-time Data

### WebSocket Simulation

The dashboard simulates real-time updates using `setInterval`:

```typescript
const useRealTimeData = () => {
  const [isLive, setIsLive] = useState(false);
  
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      // Update data every 2 seconds
      updateData();
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isLive]);
};
```

### Data Update Frequency

- **Metrics**: Every 2 seconds when live
- **Charts**: Every 3-5 seconds when live
- **Notifications**: Event-driven

## Filters and Parameters

### Available Filters

```typescript
interface DashboardFilters {
  dateRange: {
    start: Date;
    end: Date;
  };
  category: 'all' | 'sales' | 'traffic' | 'engagement';
  region: 'all' | 'north-america' | 'europe' | 'asia' | 'other';
  userType: 'all' | 'new' | 'returning' | 'premium';
}
```

### Filter Implementation

Filters are applied client-side to mock data. In production, these would be query parameters sent to your API:

```typescript
// Example API call structure
const fetchMetrics = async (filters: DashboardFilters) => {
  const params = new URLSearchParams({
    start: filters.dateRange.start.toISOString(),
    end: filters.dateRange.end.toISOString(),
    category: filters.category,
    region: filters.region,
    userType: filters.userType,
  });
  
  return fetch(`/api/metrics?${params}`);
};
```

## Export Functionality

### Supported Export Formats

- **PDF**: Chart visualizations and summary data
- **Excel**: Raw data in spreadsheet format
- **CSV**: Comma-separated values for data analysis
- **PNG**: High-resolution chart images

### Export Implementation

```typescript
const handleExport = (format: ExportFormat) => {
  switch (format) {
    case 'pdf':
      return exportToPDF(chartData, metrics);
    case 'excel':
      return exportToExcel(rawData);
    case 'csv':
      return exportToCSV(rawData);
    case 'png':
      return exportChartToPNG(chartRef.current);
  }
};
```

## Integration Guide

### Replacing Mock Data

To integrate with real APIs:

1. **Update Service Files**: Replace mock generators with actual API calls
2. **Add Authentication**: Implement JWT or API key authentication
3. **Error Handling**: Add proper error boundaries and retry logic
4. **Caching**: Implement React Query for data caching and synchronization

### Example Real API Integration

```typescript
// services/api/metricsApi.ts
import { useQuery } from '@tanstack/react-query';

export const useMetrics = (filters: DashboardFilters) => {
  return useQuery({
    queryKey: ['metrics', filters],
    queryFn: () => fetchMetrics(filters),
    refetchInterval: 30000, // 30 seconds
  });
};
```

## Performance Considerations

- **Data Pagination**: Implement for large datasets
- **Debounced Updates**: Prevent excessive re-renders
- **Memoization**: Cache expensive calculations
- **Virtual Scrolling**: For large lists
- **Progressive Loading**: Load charts as they come into view

## Security

- **API Authentication**: Secure all endpoints
- **Data Validation**: Validate all inputs
- **Rate Limiting**: Prevent API abuse
- **CORS Configuration**: Proper cross-origin settings
