
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
export const DashboardContent: React.FC = () => {
  const dashboardData = useDashboardOrchestration();
  const [staticData, setStaticData] = useState<any>(null);

  // Initialize static data on mount
  useEffect(() => {
    try {
      const data = DashboardDataService.generateInitialData();
      setStaticData(data);
    } catch (error) {
      console.error('Failed to initialize dashboard data:', error);
    }
  }, []);

  // Error state
  if (dashboardData.error) {
    return <DashboardErrorState error={dashboardData.error} onRetry={dashboardData.handleRefresh} />;
  }

  // Loading state
  if (dashboardData.isLoading || !staticData) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  // Combine static and dynamic data
  const combinedData = {
    ...staticData,
    ...dashboardData
  };

  return (
    <DashboardLayout>
      <DashboardSections
        dashboardData={combinedData}
        isLive={dashboardData.isLive}
        filters={dashboardData.filters}
        notifications={dashboardData.notifications}
        toggleLiveData={dashboardData.toggleLiveData}
        initializeData={dashboardData.handleRefresh}
        setFilters={dashboardData.setFilters}
        clearNotifications={dashboardData.clearNotifications}
        markNotificationAsRead={dashboardData.markNotificationAsRead}
      />
    </DashboardLayout>
  );
};
