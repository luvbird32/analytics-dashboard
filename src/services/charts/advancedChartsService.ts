
/**
 * Service for generating advanced chart data (treemap, scatter, funnel, gauge, etc.)
 */
export class AdvancedChartsService {
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
      }
    ];
  }
