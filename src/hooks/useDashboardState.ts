
import { useCallback, useMemo } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { FilterUtils } from '@/utils/filterUtils';

/**
 * Hook for managing dashboard state operations
 */
export const useDashboardState = () => {
  const { state, dispatch } = useDashboard();

  const setFilters = useCallback((filters: any) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, [dispatch]);

  const toggleLiveData = useCallback(() => {
    console.log(`🔄 Live data ${!state.isLive ? 'started' : 'stopped'}`);
    dispatch({ type: 'SET_LIVE', payload: !state.isLive });
  }, [state.isLive, dispatch]);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, [dispatch]);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, [dispatch]);

  const addNotification = useCallback((notification: any) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  }, [dispatch]);

  const clearNotifications = useCallback(() => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  }, [dispatch]);

  const markNotificationAsRead = useCallback((id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  }, [dispatch]);

  return {
    state,
    setFilters,
    toggleLiveData,
    setLoading,
    setError,
    addNotification,
    clearNotifications,
    markNotificationAsRead
  };
};
