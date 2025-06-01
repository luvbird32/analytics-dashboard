
import { 
  TreemapData, 
  ScatterData, 
  FunnelData, 
  GaugeData, 
  SankeyData, 
  DonutData, 
  BarData 
} from '@/types/dashboard';

/**
 * Advanced charts data generation service
 * Handles specialized visualization data for complex analytics
 */
export class AdvancedChartsService {
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

  /**
   * Generates donut chart data for category distribution
   */
  static generateDonutData(): DonutData[] {
    const categories = [
      { name: 'Desktop', value: 45, color: '#0088FE' },
      { name: 'Mobile', value: 35, color: '#00C49F' },
      { name: 'Tablet', value: 15, color: '#FFBB28' },
      { name: 'Other', value: 5, color: '#FF8042' }
    ];

    return categories.map(category => ({
      ...category,
      percentage: category.value
    }));
  }

  /**
   * Generates bar chart data for performance metrics
   */
  static generateBarData(): BarData[] {
    const metrics = ['Q1', 'Q2', 'Q3', 'Q4'];
    return metrics.map(quarter => ({
      name: quarter,
      value: Math.floor(Math.random() * 80000) + 20000,
      target: Math.floor(Math.random() * 70000) + 50000,
      category: 'quarterly'
    }));
  }
}
