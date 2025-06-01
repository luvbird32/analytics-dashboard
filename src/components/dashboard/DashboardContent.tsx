
import React, { useEffect, useState } from 'react';
import { DashboardDataService } from '@/services/dashboardDataService';
import { DashboardSkeleton } from '@/components/LoadingProvider';
import { DashboardLayout } from './layout/DashboardLayout';
import { DashboardErrorState } from './layout/DashboardErrorState';
import { DashboardSections } from './layout/DashboardSections';
import { useDashboardOrchestration } from '@/hooks/useDashboardOrchestration';

/**
 * Main dashboard content component - now focused and clean
 */
export const DashboardContent = () => {
  const {
    isLive,
    filters,
    notifications,
    isLoading,
    error,
    toggleLiveData,
    setFilters,
    clearNotifications,
    markNotificationAsRead,
    handleRefresh,
    generateInitialData
  } = useDashboardOrchestration();

  const [dashboardData, setDashboardData] = useState<any>(null);

  // Initialize data on mount
  useEffect(() => {
    try {
      const data = DashboardDataService.generateInitialData();
      setDashboardData(data);
      generateInitialData();
    } catch (error) {
      console.error('Failed to initialize dashboard data:', error);
    }
  }, [generateInitialData]);

  // Error state
  if (error) {
    return <DashboardErrorState error={error} onRetry={handleRefresh} />;
  }

  // Loading state
  if (isLoading || !dashboardData) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardSections
        dashboardData={dashboardData}
        isLive={isLive}
        filters={filters}
        notifications={notifications}
        toggleLiveData={toggleLiveData}
        initializeData={handleRefresh}
        setFilters={setFilters}
        clearNotifications={clearNotifications}
        markNotificationAsRead={markNotificationAsRead}
      />
    </DashboardLayout>
  );
};
