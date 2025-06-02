
/**
 * Social Media API service
 * Handles all social media analytics API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export class SocialApi {
  /**
   * Get sentiment analysis data
   */
  static async getSentimentData(platform?: string, dateRange?: string) {
    return apiClient.get(API_ENDPOINTS.SOCIAL.GET_SENTIMENT_DATA, { platform, dateRange });
  }

  /**
   * Get engagement metrics
   */
  static async getEngagementData(platform?: string) {
    return apiClient.get(API_ENDPOINTS.SOCIAL.GET_ENGAGEMENT_DATA, { platform });
  }

  /**
   * Get hashtag analytics
   */
  static async getHashtagData(limit: number = 10) {
    return apiClient.get(API_ENDPOINTS.SOCIAL.GET_HASHTAG_DATA, { limit });
  }

  /**
   * Get platform statistics
   */
  static async getPlatformStats() {
    return apiClient.get(API_ENDPOINTS.SOCIAL.GET_PLATFORM_STATS);
  }

  /**
   * Get trending topics
   */
  static async getTrendingTopics(platform?: string) {
    return apiClient.get(API_ENDPOINTS.SOCIAL.GET_TRENDING_TOPICS, { platform });
  }
}
