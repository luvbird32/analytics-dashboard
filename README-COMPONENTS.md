
# Analytics Dashboard Component Library

A modular, reusable React component library for building analytics dashboards with real-time data, interactive charts, and comprehensive metrics.

## 🚀 Quick Start

### Installation

```bash
# Install the required dependencies
npm install react recharts @radix-ui/react-* tailwindcss lucide-react
```

### Basic Usage

```tsx
import React from 'react';
import { 
  StandaloneLiveChart, 
  StandaloneMetricCard,
  useMetricsData 
} from './lib';

const MyDashboard = () => {
  const { metrics } = useMetricsData();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map(metric => (
          <StandaloneMetricCard key={metric.id} {...metric} />
        ))}
      </div>
      <StandaloneLiveChart data={metrics} isLive={true} />
    </div>
  );
};
```

## 📊 Available Components

### Chart Components
- `StandaloneLiveChart` - Real-time line chart
- `StandaloneSalesChart` - Sales analytics chart
- `StandaloneAreaChart` - Area chart with gradients
- `StandaloneRadarChart` - Multi-dimensional radar chart
- `StandaloneTreemapChart` - Hierarchical data visualization
- `StandaloneFunnelChart` - Conversion funnel chart
- `StandaloneDonutChart` - Donut chart with legends
- `StandaloneGaugeChart` - KPI gauge charts
- `StandaloneCandlestickChart` - Financial candlestick chart
- `StandaloneSankeyChart` - Flow diagram chart
- `StandaloneBarChart` - Performance vs target bars
- `StandaloneScatterChart` - Correlation scatter plot
- `StandaloneCryptoChart` - Cryptocurrency price chart
- `StandaloneEngagementChart` - Social media engagement
- `StandaloneSentimentChart` - Sentiment analysis chart
- `StandaloneHashtagChart` - Trending hashtags

### UI Components
- `StandaloneMetricCard` - Basic metric display
- `StandaloneEnhancedMetricCard` - Advanced metric card
- `DashboardLayout` - Layout wrapper
- `DashboardControls` - Real-time controls
- `NotificationPanel` - Notification system

### Analytics Components
- `StandaloneRevenueAnalytics` - Revenue metrics
- `StandaloneUserBehaviorAnalytics` - User behavior insights

## 🎣 Available Hooks

### Data Hooks
```tsx
import { useMetricsData, useChartsData, useSocialCryptoData } from './lib/hooks';

const MyComponent = () => {
  const { metrics, performanceMetrics } = useMetricsData();
  const { salesData, trafficData } = useChartsData();
  const { sentimentData, cryptoData } = useSocialCryptoData();
  
  // Use the data in your components
};
```

### Real-time Hooks
```tsx
import { useRealTimeCoordinator, useNotifications } from './lib/hooks';

const RealTimeDashboard = () => {
  const { isLive, toggleLiveData } = useRealTimeCoordinator();
  const { notifications, addNotification } = useNotifications();
  
  // Manage real-time functionality
};
```

### Security Hooks
```tsx
import { useSanitizedInput, useSecureStorage } from './lib/hooks';

const SecureForm = () => {
  const { value, updateValue, isValid } = useSanitizedInput('', schema);
  const { store, retrieve } = useSecureStorage();
  
  // Handle secure data input and storage
};
```

## 🛠 Services

### Data Generation
```tsx
import { MetricsService, BasicChartsService } from './lib/services';

// Generate sample data
const metrics = MetricsService.generateMetrics();
const chartData = BasicChartsService.generateSalesData();
```

### Crypto & Social Data
```tsx
import { CryptoService, SocialMediaService } from './lib/services';

const cryptoData = CryptoService.generateCryptoData();
const socialData = SocialMediaService.generateSentimentData();
```

## 🔧 Utilities

```tsx
import { FilterUtils, errorUtils } from './lib/utils';

// Filter management
const filteredData = FilterUtils.applyFilters(data, filters);

// Error handling
errorUtils.handleChartError(error, 'ChartName');
```

## 🎨 Styling

The components use Tailwind CSS classes and support dark/light themes. Ensure you have Tailwind configured:

```css
/* In your CSS */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

## 📱 Responsive Design

All components are mobile-first and responsive:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <StandaloneMetricCard {...props} />
</div>
```

## 🔐 Security Features

Built-in XSS protection and input sanitization:

```tsx
import { SanitizationService } from './lib/services';

const sanitizedData = SanitizationService.sanitizeUserInput(userInput);
```

## 🎯 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { MetricData, ChartData } from './lib';

interface MyDashboardProps {
  metrics: MetricData[];
  chartData: ChartData[];
}
```

## 📦 Bundle Size Optimization

Import only what you need to minimize bundle size:

```tsx
// Import specific components
import { StandaloneLiveChart } from './lib/components';
import { useMetricsData } from './lib/hooks';

// Or import from main index for convenience
import { StandaloneLiveChart, useMetricsData } from './lib';
```

## 🔄 Real-time Features

Built-in support for real-time data updates:

```tsx
import { useRealTimeUpdates } from './lib/hooks';

const RealTimeChart = () => {
  useRealTimeUpdates(); // Automatically handles updates
  
  return <StandaloneLiveChart data={data} isLive={true} />;
};
```

## 📊 Chart Customization

All charts support extensive customization:

```tsx
<StandaloneLiveChart
  data={data}
  isLive={true}
  config={{
    colors: ['#8884d8', '#82ca9d'],
    height: 400,
    showTooltip: true
  }}
/>
```

## 🎉 Getting Started Examples

Check the `src/pages/Index.tsx` file for a complete dashboard implementation example.

## 📄 License

Open source - feel free to use in your projects!
