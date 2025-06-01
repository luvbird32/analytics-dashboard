
import { useCallback, useEffect, useMemo } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { DashboardDataService } from '@/services/dashboardDataService';
import { NotificationService } from '@/services/notificationService';

/**
 * Single source of truth for dashboard data management
 * Follows best practices with proper separation of concerns
 */
export const useDashboardData = () => {
  const { state, dispatch } = useDashboard();

  // Memoized data initialization
  const initializeData = useCallback(() => {
    console.log('🚀 Initializing dashboard data...');
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const initialData = DashboardDataService.generateInitialData();
      
      dispatch({ type: 'SET_LOADING', payload: false });
      console.log('✅ Dashboard data initialized successfully');
      
      return initialData;
    } catch (error) {
      console.error('❌ Failed to initialize dashboard data:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load dashboard data' });
      dispatch({ type: 'SET_LOADING', payload: false });
      return null;
    }
  }, [dispatch]);

  // Real-time update logic
  const updateRealTimeData = useCallback(() => {
    if (!state.isLive) return;

    try {
      // Generate random notifications
      if (Math.random() > 0.7) {
        const notification = NotificationService.generateRandomNotification();
        dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
      }

      console.log('📊 Real-time data updated');
    } catch (error) {
      console.error('❌ Failed to update real-time data:', error);
    }
  }, [state.isLive, dispatch]);

  // Toggle live data updates
  const toggleLiveData = useCallback(() => {
    const newLiveState = !state.isLive;
    console.log(`🔄 Live data ${newLiveState ? 'started' : 'stopped'}`);
    dispatch({ type: 'SET_LIVE', payload: newLiveState });
  }, [state.isLive, dispatch]);

  // Set filters with validation
  const setFilters = useCallback((filters: any) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, [dispatch]);

  // Notification management
  const clearNotifications = useCallback(() => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  }, [dispatch]);

  const markNotificationAsRead = useCallback((id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  }, [dispatch]);

  // Setup real-time updates
  useEffect(() => {
    if (!state.isLive) return;
    
    const interval = setInterval(updateRealTimeData, 1500);
    return () => clearInterval(interval);
  }, [state.isLive, updateRealTimeData]);

  // Memoized return object to prevent unnecessary re-renders
  return useMemo(() => ({
    // State
    isLive: state.isLive,
    filters: state.filters,
    notifications: state.notifications,
    isLoading: state.isLoading,
    error: state.error,

    // Actions
    initializeData,
    toggleLiveData,
    setFilters,
    clearNotifications,
    markNotificationAsRead
  }), [
    state,
    initializeData,
    toggleLiveData,
    setFilters,
    clearNotifications,
    markNotificationAsRead
  ]);
};
