
/**
 * Standalone Hooks Export
 * 
 * This file exports hooks that can be used independently
 * for data management and real-time functionality.
 */

// Data Management Hooks
export { useMetricsData } from '@/hooks/useMetricsData';
export { useChartsData } from '@/hooks/useChartsData';
export { useSocialCryptoData } from '@/hooks/useSocialCryptoData';
export { useNotifications } from '@/hooks/useNotifications';

// State Management
export { useDashboardState } from '@/hooks/useDashboardState';
export { useDataInitialization } from '@/hooks/useDataInitialization';

// Real-time Functionality
export { useRealTimeCoordinator } from '@/hooks/useRealTimeCoordinator';
export { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';

// Security & Storage
export { useSanitizedInput } from '@/hooks/useSanitizedInput';
export { useSecureStorage } from '@/hooks/useSecureStorage';

// Utility Hooks
export { useDashboardDataManager } from '@/hooks/useDashboardDataManager';
export { useDashboardActions } from '@/hooks/useDashboardActions';
