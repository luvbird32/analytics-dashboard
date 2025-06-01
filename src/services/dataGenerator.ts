
/**
 * Data generation service for creating mock chart data
 */
export class DataGeneratorService {
  /**
   * Generates initial metrics data for testing
   */
  static generateInitialMetrics() {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        timestamp: `${String(i).padStart(2, '0')}:00`,
        value: Math.floor(Math.random() * 1000) + 100,
        label: `Metric ${i + 1}`,
        category: ['revenue', 'users', 'conversion'][Math.floor(Math.random() * 3)]
      });
    }
    return data;
  }

  /**
   * Generates a single new metric for real-time updates
   */
  static generateNewMetric(index: number) {
    return {
      timestamp: new Date().toLocaleTimeString(),
      value: Math.floor(Math.random() * 1000) + 100,
      label: `Live ${index}`,
      category: ['revenue', 'users', 'conversion'][Math.floor(Math.random() * 3)]
    };
  }

  /**
   * Generates sales data for charts
   */
  static generateSalesData() {
    return [
      { month: 'Jan', revenue: 4000, orders: 240, customers: 180, profit: 1200, expenses: 2800, target: 4500 },
      { month: 'Feb', revenue: 3000, orders: 198, customers: 165, profit: 900, expenses: 2100, target: 3500 },
      { month: 'Mar', revenue: 2000, orders: 156, customers: 142, profit: 600, expenses: 1400, target: 2500 },
      { month: 'Apr', revenue: 2780, orders: 208, customers: 167, profit: 834, expenses: 1946, target: 3200 },
      { month: 'May', revenue: 1890, orders: 134, customers: 121, profit: 567, expenses: 1323, target: 2100 },
      { month: 'Jun', revenue: 2390, orders: 167, customers: 143, profit: 717, expenses: 1673, target: 2800 }
    ];
  }

  /**
   * Generates traffic data for charts
   */
  static generateTrafficData() {
    return [
      { name: 'Organic Search', value: 4000, color: '#8884d8', sessions: 12500, growth: 15.2 },
      { name: 'Direct', value: 3000, color: '#82ca9d', sessions: 8900, growth: 8.7 },
      { name: 'Social Media', value: 2000, color: '#ffc658', sessions: 5600, growth: 22.1 },
      { name: 'Paid Ads', value: 2780, color: '#ff7300', sessions: 7800, growth: -3.4 },
      { name: 'Email', value: 1890, color: '#00ff88', sessions: 4200, growth: 12.8 },
      { name: 'Referral', value: 2390, color: '#ff0088', sessions: 3100, growth: 6.9 }
    ];
  }

  /**
   * Generates radar chart data for performance metrics
   */
  static generateRadarData() {
    return [
      { metric: 'Sales', current: 85, previous: 75, fullMark: 100 },
      { metric: 'Marketing', current: 92, previous: 88, fullMark: 100 },
      { metric: 'Support', current: 78, previous: 82, fullMark: 100 },
      { metric: 'Development', current: 88, previous: 85, fullMark: 100 },
      { metric: 'Quality', current: 95, previous: 90, fullMark: 100 },
      { metric: 'Operations', current: 82, previous: 79, fullMark: 100 }
    ];
  }

  /**
   * Generates area chart data for device usage
   */
  static generateAreaData() {
    return [
      { name: 'Jan', desktop: 4000, mobile: 2400, tablet: 1200, total: 7600 },
      { name: 'Feb', desktop: 3000, mobile: 1398, tablet: 1100, total: 5498 },
      { name: 'Mar', desktop: 2000, mobile: 9800, tablet: 1300, total: 13100 },
      { name: 'Apr', desktop: 2780, mobile: 3908, tablet: 1400, total: 8088 },
      { name: 'May', desktop: 1890, mobile: 4800, tablet: 1500, total: 8190 },
      { name: 'Jun', desktop: 2390, mobile: 3800, tablet: 1600, total: 7790 }
    ];
  }

  /**
   * Generates treemap data for hierarchical visualization
   */
  static generateTreemapData() {
    return [
      { name: 'Product A', value: 400, category: 'Electronics', color: '#8884d8' },
      { name: 'Product B', value: 300, category: 'Electronics', color: '#82ca9d' },
      { name: 'Service X', value: 300, category: 'Services', color: '#ffc658' },
      { name: 'Service Y', value: 200, category: 'Services', color: '#ff7300' },
      { name: 'Book 1', value: 150, category: 'Books', color: '#00ff88' },
      { name: 'Book 2', value: 100, category: 'Books', color: '#ff0088' }
    ];
  }

  /**
   * Generates scatter plot data for correlation analysis
   */
  static generateScatterData() {
    const data = [];
    const categories = ['A', 'B', 'C'];
    
    for (let i = 0; i < 50; i++) {
      data.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 50 + 10,
        category: categories[Math.floor(Math.random() * categories.length)]
      });
    }
    
    return data;
  }

  /**
   * Generates funnel data for conversion tracking
   */
  static generateFunnelData() {
    return [
      { name: 'Website Visits', value: 10000, conversion: 100 },
      { name: 'Product Views', value: 8500, conversion: 85 },
      { name: 'Add to Cart', value: 3200, conversion: 32 },
      { name: 'Checkout Started', value: 2100, conversion: 21 },
      { name: 'Purchase Completed', value: 1800, conversion: 18 }
    ];
  }

  /**
   * Generates gauge data for KPI visualization
   */
  static generateGaugeData() {
    return [
      {
        name: 'Revenue Growth',
        value: 75,
        max: 100,
        segments: [
          { min: 0, max: 50, color: '#ef4444', label: 'Below Target' },
          { min: 50, max: 75, color: '#f59e0b', label: 'On Track' },
          { min: 75, max: 100, color: '#22c55e', label: 'Exceeding' }
        ]
      },
      {
        name: 'Customer Satisfaction',
        value: 88,
        max: 100,
        segments: [
          { min: 0, max: 60, color: '#ef4444', label: 'Poor' },
          { min: 60, max: 80, color: '#f59e0b', label: 'Good' },
          { min: 80, max: 100, color: '#22c55e', label: 'Excellent' }
        ]
      },
      {
        name: 'System Performance',
        value: 92,
        max: 100,
        segments: [
          { min: 0, max: 70, color: '#ef4444', label: 'Critical' },
          { min: 70, max: 85, color: '#f59e0b', label: 'Warning' },
          { min: 85, max: 100, color: '#22c55e', label: 'Optimal' }
        ]
      }
    ];
  }

  /**
   * Generates Sankey diagram data for flow visualization
   */
  static generateSankeyData() {
    return {
      nodes: [
        { id: 'source1', name: 'Organic Search' },
        { id: 'source2', name: 'Social Media' },
        { id: 'source3', name: 'Direct Traffic' },
        { id: 'page1', name: 'Homepage' },
        { id: 'page2', name: 'Product Page' },
        { id: 'outcome1', name: 'Purchase' },
        { id: 'outcome2', name: 'Signup' },
        { id: 'outcome3', name: 'Exit' }
      ],
      links: [
        { source: 'source1', target: 'page1', value: 4000 },
        { source: 'source2', target: 'page1', value: 2000 },
        { source: 'source3', target: 'page2', value: 3000 },
        { source: 'page1', target: 'outcome1', value: 2500 },
        { source: 'page1', target: 'outcome2', value: 1500 },
        { source: 'page2', target: 'outcome1', value: 2000 },
        { source: 'page2', target: 'outcome3', value: 1000 }
      ]
    };
  }

  /**
   * Generates candlestick data for financial visualization
   */
  static generateCandlestickData() {
    const data = [];
    let price = 100;
    
    for (let i = 0; i < 30; i++) {
      const change = (Math.random() - 0.5) * 10;
      price += change;
      
      const open = price;
      const close = price + (Math.random() - 0.5) * 5;
      const high = Math.max(open, close) + Math.random() * 3;
      const low = Math.min(open, close) - Math.random() * 3;
      
      data.push({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        open: Number(open.toFixed(2)),
        close: Number(close.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000)
      });
    }
    
    return data;
  }

  /**
   * Generates donut chart data for category distribution
   */
  static generateDonutData() {
    const data = [
      { name: 'Desktop', value: 45, color: '#8884d8' },
      { name: 'Mobile', value: 35, color: '#82ca9d' },
      { name: 'Tablet', value: 15, color: '#ffc658' },
      { name: 'Other', value: 5, color: '#ff7300' }
    ];

    // Calculate percentages
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return data.map(item => ({
      ...item,
      percentage: Number(((item.value / total) * 100).toFixed(1))
    }));
  }

  /**
   * Generates bar chart data for performance vs targets
   */
  static generateBarData() {
    return [
      { name: 'Q1 Sales', value: 8500, target: 9000, category: 'sales' },
      { name: 'Q2 Sales', value: 9200, target: 9500, category: 'sales' },
      { name: 'Q3 Sales', value: 8800, target: 8500, category: 'sales' },
      { name: 'Q4 Sales', value: 9600, target: 10000, category: 'sales' },
      { name: 'Marketing', value: 7200, target: 7500, category: 'marketing' },
      { name: 'Support', value: 8900, target: 8000, category: 'support' }
    ];
  }
}
