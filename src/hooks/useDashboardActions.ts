
import { useCallback } from 'react';
import { SanitizationService } from '@/services/security/sanitizationService';

/**
 * Focused hook for dashboard action handlers
 */
export const useDashboardActions = (
  toggleLiveData: () => void,
  setFilters: (filters: any) => void,
  clearNotifications: () => void,
  markNotificationAsRead: (id: string) => void,
  generateInitialData: () => void
) => {
  const setSanitizedFilters = useCallback((filters: any) => {
    const sanitizedFilters = SanitizationService.sanitizeDashboardFilters(filters);
    setFilters(sanitizedFilters);
  }, [setFilters]);

  const addSanitizedNotification = useCallback((notification: any) => {
    const sanitizedNotification = SanitizationService.sanitizeNotification(notification);
    console.log('Sanitized notification:', sanitizedNotification);
  }, []);

  const handleRefresh = useCallback(() => {
    console.log('🔄 Refreshing dashboard data...');
    generateInitialData();
  }, [generateInitialData]);

  return {
    setSanitizedFilters,
    addSanitizedNotification,
    handleRefresh,
    toggleLiveData,
    clearNotifications,
    markNotificationAsRead
  };
};
