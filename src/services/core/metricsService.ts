import { MetricData, PerformanceMetric, AreaData, RadarData } from '@/types/dashboard';

/**
 * Service for generating core metrics data
 * Centralized metrics generation with consistent data structures
 */
export class MetricsService {
  /**
   * Generates initial metrics data for the dashboard
   */
  static generateInitialMetrics(): MetricData[] {
    return [
      { timestamp: '00:00', value: 120, label: 'Revenue', category: 'revenue' },
      { timestamp: '01:00', value: 98, label: 'Users', category: 'users' },
      { timestamp: '02:00', value: 156, label: 'Conversion', category: 'conversion' },
      { timestamp: '03:00', value: 134, label: 'Traffic', category: 'traffic' },
      { timestamp: '04:00', value: 187, label: 'Sales', category: 'sales' }
    ];
  }

  /**
   * Generates performance metrics for dashboard cards
   */
  static generatePerformanceMetrics(): PerformanceMetric[] {
    return [
      {
        id: '1',
        title: 'Revenue',
        value: 45678,
        change: 12.5,
        trend: 'up',
        category: 'revenue',
        priority: 'high',
        unit: '$'
      },
      {
        id: '2',
        title: 'Active Users',
        value: 12543,
        change: -2.1,
        trend: 'down',
        category: 'users',
        priority: 'medium',
        unit: 'users'
      },
      {
        id: '3',
        title: 'Conversion Rate',
        value: 3.45,
        change: 0.8,
        trend: 'up',
        category: 'conversion',
        priority: 'high',
        unit: '%'
      }
    ];
  }

  /**
   * Generates area chart data for device usage
   */
  static generateAreaData(): AreaData[] {
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
   * Generates radar chart data for performance metrics
   */
  static generateRadarData(): RadarData[] {
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
   * Generates a new random metric for real-time updates
   */
  static generateNewMetric(): MetricData {
    const categories = ['revenue', 'users', 'conversion', 'traffic', 'sales'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    return {
      timestamp: new Date().toLocaleTimeString(),
      value: Math.floor(Math.random() * 200) + 50,
      label: `Live ${category}`,
      category
    };
  }
}
