
/**
 * Analytics API service
 * Handles all analytics-related API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export class AnalyticsApi {
  /**
   * Get detailed analytics
   */
  static async getDetailedAnalytics(dateRange?: string) {
    return apiClient.get(API_ENDPOINTS.ANALYTICS.GET_DETAILED, { dateRange });
  }

  /**
   * Get user behavior analytics
   */
  static async getUserBehavior(dateRange?: string) {
    return apiClient.get(API_ENDPOINTS.ANALYTICS.GET_USER_BEHAVIOR, { dateRange });
  }

  /**
   * Get revenue analytics
   */
  static async getRevenueAnalytics(dateRange?: string) {
    return apiClient.get(API_ENDPOINTS.ANALYTICS.GET_REVENUE, { dateRange });
  }

  /**
   * Get conversion analytics
   */
  static async getConversionAnalytics() {
    return apiClient.get(API_ENDPOINTS.ANALYTICS.GET_CONVERSION);
  }

  /**
   * Get session metrics
   */
  static async getSessionMetrics(dateRange?: string) {
    return apiClient.get(API_ENDPOINTS.ANALYTICS.GET_SESSION_METRICS, { dateRange });
  }
}
