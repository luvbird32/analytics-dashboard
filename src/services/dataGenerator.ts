import { 
  MetricData, 
  SalesData, 
  TrafficData, 
  PerformanceMetric, 
  HeatmapData, 
  RadarData, 
  AreaData,
  NotificationData,
  TreemapData,
  ScatterData,
  FunnelData,
  GaugeData,
  CandlestickData,
  SankeyData
} from '@/types/dashboard';

/**
 * Data generation service for dashboard analytics
 * Provides comprehensive mock data for all chart types
 */
export class DataGeneratorService {
  /**
   * Generates initial performance metrics with targets and priorities
   */
  static generatePerformanceMetrics(): PerformanceMetric[] {
    return [
      {
        id: 'revenue',
        title: 'Total Revenue',
        value: 245231,
        change: 15.2,
        trend: 'up',
        unit: '$',
        target: 300000,
        category: 'revenue',
        priority: 'high'
      },
      {
        id: 'users',
        title: 'Active Users',
        value: 12543,
        change: -2.1,
        trend: 'down',
        unit: '',
        target: 15000,
        category: 'users',
        priority: 'high'
      },
      {
        id: 'conversion',
        title: 'Conversion Rate',
        value: 4.67,
        change: 1.3,
        trend: 'up',
        unit: '%',
        target: 5.0,
        category: 'conversion',
        priority: 'medium'
      },
      {
        id: 'bounce',
        title: 'Bounce Rate',
        value: 38.2,
        change: -3.5,
        trend: 'down',
        unit: '%',
        target: 35.0,
        category: 'performance',
        priority: 'medium'
      },
      {
        id: 'loadTime',
        title: 'Avg Load Time',
        value: 1.34,
        change: -0.15,
        trend: 'down',
        unit: 's',
        target: 1.0,
        category: 'performance',
        priority: 'high'
      },
      {
        id: 'satisfaction',
        title: 'User Satisfaction',
        value: 4.8,
        change: 0.2,
        trend: 'up',
        unit: '/5',
        target: 4.5,
        category: 'users',
        priority: 'medium'
      }
    ];
  }

  /**
   * Generates enhanced sales data with profit and targets
   */
  static generateSalesData(): SalesData[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 80000) + 40000,
      orders: Math.floor(Math.random() * 800) + 400,
      customers: Math.floor(Math.random() * 500) + 250,
      profit: Math.floor(Math.random() * 25000) + 15000,
      expenses: Math.floor(Math.random() * 20000) + 10000,
      target: Math.floor(Math.random() * 70000) + 50000
    }));
  }

  /**
   * Generates traffic sources with growth metrics
   */
  static generateTrafficData(): TrafficData[] {
    return [
      { name: 'Organic Search', value: 45, color: '#0088FE', growth: 12.5, sessions: 15420 },
      { name: 'Direct Traffic', value: 25, color: '#00C49F', growth: -2.3, sessions: 8560 },
      { name: 'Social Media', value: 20, color: '#FFBB28', growth: 8.7, sessions: 6840 },
      { name: 'Email Marketing', value: 10, color: '#FF8042', growth: 15.2, sessions: 3420 }
    ];
  }

  /**
   * Generates radar chart data for performance metrics
   */
  static generateRadarData(): RadarData[] {
    return [
      { metric: 'Performance', current: 85, previous: 80, fullMark: 100 },
      { metric: 'Security', current: 92, previous: 88, fullMark: 100 },
      { metric: 'Usability', current: 78, previous: 75, fullMark: 100 },
      { metric: 'Accessibility', current: 88, previous: 82, fullMark: 100 },
      { metric: 'SEO', current: 94, previous: 90, fullMark: 100 },
      { metric: 'Mobile', current: 87, previous: 85, fullMark: 100 }
    ];
  }

  /**
   * Generates area chart data for device usage
   */
  static generateAreaData(): AreaData[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    return months.map(month => ({
      name: month,
      desktop: Math.floor(Math.random() * 3000) + 2000,
      mobile: Math.floor(Math.random() * 4000) + 3000,
      tablet: Math.floor(Math.random() * 1000) + 500,
      total: 0
    })).map(item => ({
      ...item,
      total: item.desktop + item.mobile + item.tablet
    }));
  }

  /**
   * Generates initial real-time metrics
   */
  static generateInitialMetrics(): MetricData[] {
    const now = new Date();
    return Array.from({ length: 20 }, (_, i) => ({
      timestamp: new Date(now.getTime() - (19 - i) * 60000).toLocaleTimeString(),
      value: Math.floor(Math.random() * 150) + 50,
      label: `Point ${i + 1}`,
      category: ['sales', 'traffic', 'engagement'][Math.floor(Math.random() * 3)]
    }));
  }

  /**
   * Generates a new real-time metric data point
   */
  static generateNewMetric(previousCount: number): MetricData {
    return {
      timestamp: new Date().toLocaleTimeString(),
      value: Math.floor(Math.random() * 150) + 50,
      label: `Live ${previousCount + 1}`,
      category: ['sales', 'traffic', 'engagement'][Math.floor(Math.random() * 3)]
    };
  }

  /**
   * Generates treemap data for hierarchical visualization
   */
  static generateTreemapData(): TreemapData[] {
    return [
      {
        name: 'Product Categories',
        value: 100,
        color: '#8884d8',
        children: [
          { name: 'Electronics', value: 45, color: '#82ca9d' },
          { name: 'Clothing', value: 25, color: '#ffc658' },
          { name: 'Books', value: 15, color: '#ff7300' },
          { name: 'Home & Garden', value: 15, color: '#00ff00' }
        ]
      }
    ];
  }

  /**
   * Generates scatter plot data for correlation analysis
   */
  static generateScatterData(): ScatterData[] {
    return Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 50 + 10,
      category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
    }));
  }

  /**
   * Generates funnel data for conversion tracking
   */
  static generateFunnelData(): FunnelData[] {
    return [
      { name: 'Visitors', value: 10000, conversion: 100 },
      { name: 'Leads', value: 3000, conversion: 30 },
      { name: 'Qualified', value: 1500, conversion: 15 },
      { name: 'Customers', value: 500, conversion: 5 }
    ];
  }

  /**
   * Generates gauge data for KPI tracking
   */
  static generateGaugeData(): GaugeData[] {
    return [
      {
        name: 'Performance Score',
        value: 78,
        max: 100,
        segments: [
          { min: 0, max: 40, color: '#ff4d4f', label: 'Poor' },
          { min: 40, max: 70, color: '#faad14', label: 'Fair' },
          { min: 70, max: 90, color: '#52c41a', label: 'Good' },
          { min: 90, max: 100, color: '#1890ff', label: 'Excellent' }
        ]
      }
    ];
  }

  /**
   * Generates candlestick data for financial charts
   */
  static generateCandlestickData(): CandlestickData[] {
    let currentPrice = 100;
    return Array.from({ length: 30 }, (_, i) => {
      const open = currentPrice;
      const close = open + (Math.random() - 0.5) * 10;
      const high = Math.max(open, close) + Math.random() * 5;
      const low = Math.min(open, close) - Math.random() * 5;
      currentPrice = close;
      
      return {
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        open: Math.round(open * 100) / 100,
        high: Math.round(high * 100) / 100,
        low: Math.round(low * 100) / 100,
        close: Math.round(close * 100) / 100,
        volume: Math.floor(Math.random() * 1000000)
      };
    });
  }

  /**
   * Generates sankey data for flow visualization
   */
  static generateSankeyData(): SankeyData {
    return {
      nodes: [
        { id: 'source1', name: 'Organic Search' },
        { id: 'source2', name: 'Social Media' },
        { id: 'source3', name: 'Direct' },
        { id: 'middle1', name: 'Homepage' },
        { id: 'middle2', name: 'Products' },
        { id: 'end1', name: 'Purchase' },
        { id: 'end2', name: 'Exit' }
      ],
      links: [
        { source: 'source1', target: 'middle1', value: 200 },
        { source: 'source1', target: 'middle2', value: 150 },
        { source: 'source2', target: 'middle1', value: 100 },
        { source: 'source3', target: 'middle2', value: 80 },
        { source: 'middle1', target: 'end1', value: 120 },
        { source: 'middle1', target: 'end2', value: 180 },
        { source: 'middle2', target: 'end1', value: 90 },
        { source: 'middle2', target: 'end2', value: 140 }
      ]
    };
  }
}
