
import { MetricData, PerformanceMetric } from '@/types/dashboard';

/**
 * Service for generating detailed analytics data
 */
export class DetailedAnalyticsService {
  /**
   * Generate user behavior analytics
   */
  static generateUserBehaviorAnalytics() {
    return {
      sessionDuration: {
        average: 8.5,
        median: 6.2,
        trend: 'up' as const,
        change: 12.3
      },
      pageViews: {
        total: 156789,
        unique: 89234,
        trend: 'up' as const,
        change: 8.7
      },
      bounceRate: {
        rate: 34.2,
        trend: 'down' as const,
        change: -5.1
      },
      conversionFunnel: [
        { stage: 'Landing Page', users: 10000, conversion: 100 },
        { stage: 'Product View', users: 7500, conversion: 75 },
        { stage: 'Add to Cart', users: 3200, conversion: 32 },
        { stage: 'Checkout', users: 2100, conversion: 21 },
        { stage: 'Purchase', users: 1800, conversion: 18 }
      ]
    };
  }

  /**
   * Generate revenue analytics
   */
  static generateRevenueAnalytics() {
    return {
      totalRevenue: 287450,
      revenueGrowth: 15.8,
      averageOrderValue: 156.78,
      customerLifetimeValue: 892.34,
      monthlyRecurringRevenue: 45678,
      churnRate: 3.2,
      revenueBySource: [
        { source: 'Organic Search', revenue: 98450, percentage: 34.2 },
        { source: 'Paid Ads', revenue: 78920, percentage: 27.5 },
        { source: 'Social Media', revenue: 56780, percentage: 19.8 },
        { source: 'Direct', revenue: 34560, percentage: 12.0 },
        { source: 'Email', revenue: 18740, percentage: 6.5 }
      ]
    };
  }

  /**
   * Generate customer analytics
   */
  static generateCustomerAnalytics() {
    return {
      totalCustomers: 12456,
      newCustomers: 1234,
      returningCustomers: 8934,
      customerRetentionRate: 78.5,
      customerSatisfactionScore: 4.3,
      netPromoterScore: 67,
      customerSegments: [
        { segment: 'VIP', count: 234, revenue: 89450 },
        { segment: 'Regular', count: 5678, revenue: 156780 },
        { segment: 'New', count: 3456, revenue: 34560 },
        { segment: 'At Risk', count: 890, revenue: 12450 }
      ]
    };
  }

  /**
   * Generate performance analytics
   */
  static generatePerformanceAnalytics() {
    return {
      pageLoadTime: 2.3,
      serverResponseTime: 180,
      uptime: 99.8,
      errorRate: 0.12,
      apiResponseTimes: [
        { endpoint: '/api/users', avgTime: 120, requests: 15670 },
        { endpoint: '/api/products', avgTime: 95, requests: 23450 },
        { endpoint: '/api/orders', avgTime: 180, requests: 8920 },
        { endpoint: '/api/analytics', avgTime: 340, requests: 2340 }
      ]
    };
  }

  /**
   * Generate traffic analytics
   */
  static generateTrafficAnalytics() {
    return {
      totalVisitors: 45678,
      uniqueVisitors: 34567,
      trafficSources: [
        { source: 'Direct', visitors: 12345, percentage: 35.7 },
        { source: 'Google', visitors: 8901, percentage: 25.7 },
        { source: 'Facebook', visitors: 5432, percentage: 15.7 },
        { source: 'Twitter', visitors: 3456, percentage: 10.0 },
        { source: 'LinkedIn', visitors: 2345, percentage: 6.8 },
        { source: 'Other', visitors: 2088, percentage: 6.1 }
      ],
      deviceBreakdown: [
        { device: 'Desktop', users: 15678, percentage: 45.3 },
        { device: 'Mobile', users: 13456, percentage: 38.9 },
        { device: 'Tablet', users: 5433, percentage: 15.8 }
      ],
      browserStats: [
        { browser: 'Chrome', users: 18765, percentage: 54.2 },
        { browser: 'Safari', users: 7890, percentage: 22.8 },
        { browser: 'Firefox', users: 4567, percentage: 13.2 },
        { browser: 'Edge', users: 2345, percentage: 6.8 },
        { browser: 'Other', users: 1000, percentage: 3.0 }
      ]
    };
  }

  /**
   * Generate comprehensive analytics summary
   */
  static generateComprehensiveAnalytics() {
    return {
      userBehavior: this.generateUserBehaviorAnalytics(),
      revenue: this.generateRevenueAnalytics(),
      customers: this.generateCustomerAnalytics(),
      performance: this.generatePerformanceAnalytics(),
      traffic: this.generateTrafficAnalytics()
    };
  }
}
