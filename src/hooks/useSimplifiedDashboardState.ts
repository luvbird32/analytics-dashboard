
import { useCallback } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';

/**
 * Simplified dashboard state hook with core operations only
 */
export const useSimplifiedDashboardState = () => {
  const { state, dispatch } = useDashboard();

  const toggleLiveData = useCallback(() => {
    dispatch({ type: 'SET_LIVE', payload: !state.isLive });
  }, [state.isLive, dispatch]);

  const setFilters = useCallback((filters: any) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, [dispatch]);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, [dispatch]);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, [dispatch]);

  return {
    state,
    toggleLiveData,
    setFilters,
    setLoading,
    setError
  };
};
