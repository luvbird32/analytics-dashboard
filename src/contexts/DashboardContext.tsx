
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { DashboardFilters, NotificationData } from '@/types/dashboard';

interface DashboardState {
  isLive: boolean;
  filters: DashboardFilters;
  notifications: NotificationData[];
  isLoading: boolean;
  error: string | null;
}

type DashboardAction =
  | { type: 'SET_LIVE'; payload: boolean }
  | { type: 'SET_FILTERS'; payload: DashboardFilters }
  | { type: 'ADD_NOTIFICATION'; payload: NotificationData }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: DashboardState = {
  isLive: false,
  filters: {
    dateRange: '30d',
    category: [],
    region: [],
    userType: []
  },
  notifications: [],
  isLoading: false,
  error: null
};

/**
 * Dashboard state reducer for centralized state management
 */
const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  switch (action.type) {
    case 'SET_LIVE':
      return { ...state, isLive: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications].slice(0, 20)
      };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, isRead: true }
            : notification
        )
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

interface DashboardContextType {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

/**
 * Dashboard context provider for centralized state management
 */
export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

/**
 * Custom hook to use dashboard context
 */
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
