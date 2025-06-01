
/**
 * Data generation service for creating mock chart data
 */
export class DataGeneratorService {
  /**
   * Generates radar chart data for performance metrics
   */
  static generateRadarData() {
    return [
      { metric: 'Sales', current: 85, previous: 75 },
      { metric: 'Marketing', current: 92, previous: 88 },
      { metric: 'Support', current: 78, previous: 82 },
      { metric: 'Development', current: 88, previous: 85 },
      { metric: 'Quality', current: 95, previous: 90 },
      { metric: 'Operations', current: 82, previous: 79 }
    ];
  }

  /**
   * Generates area chart data for device usage
   */
  static generateAreaData() {
    return [
      { name: 'Jan', desktop: 4000, mobile: 2400, tablet: 1200 },
      { name: 'Feb', desktop: 3000, mobile: 1398, tablet: 1100 },
      { name: 'Mar', desktop: 2000, mobile: 9800, tablet: 1300 },
      { name: 'Apr', desktop: 2780, mobile: 3908, tablet: 1400 },
      { name: 'May', desktop: 1890, mobile: 4800, tablet: 1500 },
      { name: 'Jun', desktop: 2390, mobile: 3800, tablet: 1600 }
    ];
  }

  /**
   * Generates treemap data for hierarchical visualization
   */
  static generateTreemapData() {
    return [
      { name: 'Product A', value: 400, category: 'Electronics' },
      { name: 'Product B', value: 300, category: 'Electronics' },
      { name: 'Service X', value: 300, category: 'Services' },
      { name: 'Service Y', value: 200, category: 'Services' },
      { name: 'Book 1', value: 150, category: 'Books' },
      { name: 'Book 2', value: 100, category: 'Books' }
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
      { name: 'Website Visits', value: 10000 },
      { name: 'Product Views', value: 8500 },
      { name: 'Add to Cart', value: 3200 },
      { name: 'Checkout Started', value: 2100 },
      { name: 'Purchase Completed', value: 1800 }
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
    return [
      { name: 'Desktop', value: 45, color: '#8884d8' },
      { name: 'Mobile', value: 35, color: '#82ca9d' },
      { name: 'Tablet', value: 15, color: '#ffc658' },
      { name: 'Other', value: 5, color: '#ff7300' }
    ];
  }

  /**
   * Generates bar chart data for performance vs targets
   */
  static generateBarData() {
    return [
      { name: 'Q1 Sales', value: 8500, target: 9000 },
      { name: 'Q2 Sales', value: 9200, target: 9500 },
      { name: 'Q3 Sales', value: 8800, target: 8500 },
      { name: 'Q4 Sales', value: 9600, target: 10000 },
      { name: 'Marketing', value: 7200, target: 7500 },
      { name: 'Support', value: 8900, target: 8000 }
    ];
  }
}
