
/**
 * Metrics API service
 * Handles all metrics-related API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { MetricData, PerformanceMetric } from '@/types/dashboard';

export class MetricsApi {
  /**
   * Get dashboard metrics
   */
  static async getDashboardMetrics() {
    return apiClient.get<MetricData[]>(API_ENDPOINTS.METRICS.GET_DASHBOARD_METRICS);
  }

  /**
   * Get performance metrics
   */
  static async getPerformanceMetrics() {
    return apiClient.get<PerformanceMetric[]>(API_ENDPOINTS.METRICS.GET_PERFORMANCE_METRICS);
  }

  /**
   * Update a specific metric
   */
  static async updateMetric(metricId: string, value: number) {
    return apiClient.patch(API_ENDPOINTS.METRICS.UPDATE_METRIC, {
      metricId,
      value,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Get trend data
   */
  static async getTrends(period: '24h' | '7d' | '30d' | '90d' = '30d') {
    return apiClient.get(API_ENDPOINTS.METRICS.GET_TRENDS, { period });
  }

  /**
   * Get real-time metrics
   */
  static async getRealTimeMetrics() {
    return apiClient.get(API_ENDPOINTS.METRICS.GET_REAL_TIME);
  }
}
