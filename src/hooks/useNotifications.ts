
import { useState, useCallback } from 'react';
import { NotificationData } from '@/types/dashboard';
import { NotificationService } from '@/services/notificationService';

/**
 * Hook for managing notifications
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  /**
   * Adds a notification
   */
  const addNotification = useCallback((notification: NotificationData) => {
    setNotifications(prev => NotificationService.addNotification(prev, notification));
  }, []);

  /**
   * Handles data export with notification
   */
  const handleExport = useCallback((format: 'pdf' | 'excel' | 'csv' | 'png') => {
    console.log(`📤 Exporting dashboard data as ${format.toUpperCase()}...`);
    
    const notification = NotificationService.createExportNotification(format);
    addNotification(notification);
  }, [addNotification]);

  /**
   * Clears all notifications
   */
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  /**
   * Marks a notification as read
   */
  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => NotificationService.markAsRead(prev, id));
  }, []);

  return {
    notifications,
    addNotification,
    handleExport,
    clearNotifications,
    markNotificationAsRead
  };
};
