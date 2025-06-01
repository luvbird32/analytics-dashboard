
/**
 * Service for generating basic chart data (sales, traffic, area, radar)
 */
export class BasicChartsService {
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
}
