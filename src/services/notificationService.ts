
import { NotificationData, PerformanceMetric } from '@/types/dashboard';

/**
 * Service for managing dashboard notifications
 * Provides methods for creating, managing, and updating notifications
 */
export class NotificationService {
  /**
   * Generates a random notification for real-time updates
   */
  static generateRandomNotification(): NotificationData {
    const types: ('info' | 'warning' | 'success' | 'error')[] = ['info', 'warning', 'success', 'error'];
    const messages = [
      'System performance is optimal',
      'New user registration detected',
      'Revenue target exceeded for this month',
      'Server response time improved',
      'Database backup completed successfully',
      'High traffic detected on landing page',
      'Conversion rate increased by 5%',
      'New feature deployment successful'
    ];

    const type = types[Math.floor(Math.random() * types.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];

    return {
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Alert`,
      message,
      timestamp: new Date(),
      isRead: false
    };
  }

  /**
   * Creates a metric change notification
   */
  static createMetricChangeNotification(metric: PerformanceMetric, change: number): NotificationData {
    const isPositive = change > 0;
    const type = isPositive ? 'success' : 'warning';
    const direction = isPositive ? 'increased' : 'decreased';
    const verb = isPositive ? 'rose' : 'fell';
    
    return {
      id: `metric-${metric.id}-${Date.now()}`,
      type,
      title: `${metric.title} ${direction === 'increased' ? 'Increased' : 'Decreased'}`,
      message: `${metric.title} ${verb} by ${Math.abs(change).toFixed(1)}${metric.unit || ''}`,
      timestamp: new Date(),
      isRead: false
    };
  }

  /**
   * Creates an export notification
   */
  static createExportNotification(format: string): NotificationData {
    return {
      id: `export-${Date.now()}`,
      type: 'success',
      title: 'Export Completed',
      message: `Dashboard data exported as ${format.toUpperCase()} successfully`,
      timestamp: new Date(),
      isRead: false
    };
  }

  /**
   * Adds a notification to the list
   */
  static addNotification(notifications: NotificationData[], notification: NotificationData): NotificationData[] {
    return [notification, ...notifications.slice(0, 9)]; // Keep only last 10 notifications
  }

  /**
   * Marks a notification as read
   */
  static markAsRead(notifications: NotificationData[], id: string): NotificationData[] {
    return notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    );
  }

  /**
   * Clears all notifications
   */
  static clearAll(): NotificationData[] {
    return [];
  }
}
