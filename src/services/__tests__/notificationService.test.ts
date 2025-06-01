
import { NotificationService } from '../notificationService';
import { mockPerformanceMetrics, mockNotifications } from '@/test/mocks/mockData';

describe('NotificationService', () => {
  describe('createMetricChangeNotification', () => {
    it('creates success notification for positive change', () => {
      const metric = mockPerformanceMetrics[0];
      const change = 5.2;
      
      const notification = NotificationService.createMetricChangeNotification(metric, change);
      
      expect(notification.type).toBe('success');
      expect(notification.title).toBe('Revenue Increased');
      expect(notification.message).toBe('Revenue rose by 5.2$');
      expect(notification.read).toBe(false);
    });

    it('creates warning notification for negative change', () => {
      const metric = mockPerformanceMetrics[0];
      const change = -3.1;
      
      const notification = NotificationService.createMetricChangeNotification(metric, change);
      
      expect(notification.type).toBe('warning');
      expect(notification.title).toBe('Revenue Decreased');
      expect(notification.message).toBe('Revenue fell by 3.1$');
    });
  });

  describe('createExportNotification', () => {
    it('creates export notification with correct format', () => {
      const notification = NotificationService.createExportNotification('pdf');
      
      expect(notification.type).toBe('success');
      expect(notification.message).toBe('Dashboard data exported as PDF successfully');
    });
  });

  describe('addNotification', () => {
    it('adds notification to beginning of list', () => {
      const newNotification = mockNotifications[0];
      const result = NotificationService.addNotification([], newNotification);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(newNotification);
    });

    it('maintains max count limit', () => {
      const existingNotifications = Array(10).fill(null).map((_, i) => ({
        ...mockNotifications[0],
        id: `notif-${i}`
      }));
      
      const newNotification = { ...mockNotifications[0], id: 'new-notif' };
      const result = NotificationService.addNotification(existingNotifications, newNotification);
      
      expect(result).toHaveLength(10);
      expect(result[0].id).toBe('new-notif');
    });
  });

  describe('markAsRead', () => {
    it('marks specified notification as read', () => {
      const notifications = [mockNotifications[0]];
      const result = NotificationService.markAsRead(notifications, '1');
      
      expect(result[0].read).toBe(true);
    });

    it('does not affect other notifications', () => {
      const notifications = [
        { ...mockNotifications[0], id: '1' },
        { ...mockNotifications[0], id: '2', read: false }
      ];
      
      const result = NotificationService.markAsRead(notifications, '1');
      
      expect(result[0].read).toBe(true);
      expect(result[1].read).toBe(false);
    });
  });
});
