
/**
 * Notifications API service
 * Handles all notification-related API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS, buildApiUrl } from '../endpoints';
import { NotificationData } from '@/types/dashboard';

export class NotificationsApi {
  /**
   * Get all notifications
   */
  static async getAll(limit?: number, offset?: number) {
    return apiClient.get<NotificationData[]>(API_ENDPOINTS.NOTIFICATIONS.GET_ALL, { 
      limit, 
      offset 
    });
  }

  /**
   * Create a new notification
   */
  static async create(notification: Omit<NotificationData, 'id' | 'timestamp'>) {
    return apiClient.post<NotificationData>(API_ENDPOINTS.NOTIFICATIONS.CREATE, notification);
  }

  /**
   * Update a notification
   */
  static async update(id: string, updates: Partial<NotificationData>) {
    const endpoint = buildApiUrl(API_ENDPOINTS.NOTIFICATIONS.UPDATE, { id });
    return apiClient.patch<NotificationData>(endpoint, updates);
  }

  /**
   * Delete a notification
   */
  static async delete(id: string) {
    const endpoint = buildApiUrl(API_ENDPOINTS.NOTIFICATIONS.DELETE, { id });
    return apiClient.delete(endpoint);
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(id: string) {
    const endpoint = buildApiUrl(API_ENDPOINTS.NOTIFICATIONS.MARK_READ, { id });
    return apiClient.patch(endpoint, { read: true });
  }

  /**
   * Clear all notifications
   */
  static async clearAll() {
    return apiClient.delete(API_ENDPOINTS.NOTIFICATIONS.CLEAR_ALL);
  }
}
