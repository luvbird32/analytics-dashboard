
import { NotificationData, PerformanceMetric } from '@/types/dashboard';

/**
 * Notification service for real-time alerts and updates
 * Manages notification generation and state
 */
export class NotificationService {
  /**
   * Creates a notification for metric changes
   */
  static createMetricChangeNotification(
    metric: PerformanceMetric, 
    change: number
  ): NotificationData {
    return {
      id: `notif-${Date.now()}-${Math.random()}`,
      type: change > 0 ? 'success' : 'warning',
      title: `${metric.title} ${change > 0 ? 'Increased' : 'Decreased'}`,
      message: `${metric.title} ${change > 0 ? 'rose' : 'fell'} by ${Math.abs(change).toFixed(1)}${metric.unit}`,
      timestamp: new Date(),
      isRead: false
    };
  }

  /**
   * Creates an export completion notification
   */
  static createExportNotification(format: string): NotificationData {
    return {
      id: `export-${Date.now()}`,
      type: 'success',
      title: 'Export Completed',
      message: `Dashboard data exported successfully as ${format.toUpperCase()}`,
      timestamp: new Date(),
      isRead: false
    };
  }

  /**
   * Adds a notification to the list while maintaining max count
   */
  static addNotification(
    notifications: NotificationData[], 
    newNotification: NotificationData,
    maxCount: number = 10
  ): NotificationData[] {
    return [newNotification, ...notifications.slice(0, maxCount - 1)];
  }

  /**
   * Marks a notification as read
   */
  static markAsRead(
    notifications: NotificationData[], 
    id: string
  ): NotificationData[] {
    return notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    );
  }
}
