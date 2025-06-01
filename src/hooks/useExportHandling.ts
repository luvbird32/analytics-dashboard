
import { useCallback } from 'react';
import { NotificationService } from '@/services/notificationService';
import { useDashboardState } from './useDashboardState';

/**
 * Hook for handling data exports
 */
export const useExportHandling = () => {
  const { addNotification } = useDashboardState();

  const handleExport = useCallback((format: 'pdf' | 'excel' | 'csv' | 'png') => {
    console.log(`📤 Exporting dashboard data as ${format.toUpperCase()}...`);
    
    const notification = NotificationService.createExportNotification(format);
    addNotification(notification);
  }, [addNotification]);

  return {
    handleExport
  };
};
