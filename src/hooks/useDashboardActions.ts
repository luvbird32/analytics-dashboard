
import { useCallback } from 'react';
import { SanitizationService } from '@/services/security/sanitizationService';

/**
 * Clean dashboard actions hook
 */
export const useDashboardActions = (
  toggleLiveData: () => void,
  setFilters: (filters: any) => void,
  generateInitialData: () => void
) => {
  const setSanitizedFilters = useCallback((filters: any) => {
    const sanitizedFilters = SanitizationService.sanitizeDashboardFilters(filters);
    setFilters(sanitizedFilters);
  }, [setFilters]);

  const handleRefresh = useCallback(() => {
    console.log('🔄 Refreshing dashboard data...');
    generateInitialData();
  }, [generateInitialData]);

  const clearNotifications = useCallback(() => {
    console.log('Clearing notifications...');
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    console.log('Marking notification as read:', id);
  }, []);

  return {
    setSanitizedFilters,
    handleRefresh,
    toggleLiveData,
    clearNotifications,
    markNotificationAsRead
  };
};
