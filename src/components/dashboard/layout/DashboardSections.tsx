
import React, { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { DashboardSkeleton } from '@/components/LoadingProvider';
import { AIManagementSection } from '../sections/AIManagementSection';
import { DashboardHeaderSection } from '../sections/DashboardHeaderSection';
import { DashboardMetricsSection } from '../sections/DashboardMetricsSection';
import { DashboardChartsSection } from '../sections/DashboardChartsSection';
import { DashboardFooterSection } from '../sections/DashboardFooterSection';

interface DashboardSectionsProps {
  dashboardData: any;
  isLive: boolean;
  filters: any;
  notifications: any[];
  toggleLiveData: () => void;
  initializeData: () => void;
  setFilters: (filters: any) => void;
  clearNotifications: () => void;
  markNotificationAsRead: (id: string) => void;
}

/**
 * Refactored dashboard sections - now much smaller and focused
 */
export const DashboardSections = ({
  dashboardData,
  isLive,
  filters,
  notifications,
  toggleLiveData,
  initializeData,
  setFilters,
  clearNotifications,
  markNotificationAsRead
}: DashboardSectionsProps) => {
  console.log('🔧 DashboardSections rendering with data:', {
    metricsCount: dashboardData?.metrics?.length || 0,
    performanceMetricsCount: dashboardData?.performanceMetrics?.length || 0,
    hasData: !!dashboardData
  });

  return (
    <>
      <DashboardHeaderSection
        isLive={isLive}
        filters={filters}
        toggleLiveData={toggleLiveData}
        initializeData={initializeData}
        setFilters={setFilters}
      />

      <ErrorBoundary>
        <Suspense fallback={<DashboardSkeleton />}>
          <AIManagementSection data={dashboardData?.metrics || []} />
        </Suspense>
      </ErrorBoundary>

      <DashboardMetricsSection
        performanceMetrics={dashboardData?.performanceMetrics || []}
        filters={filters}
        setFilters={setFilters}
      />

      <DashboardChartsSection
        dashboardData={dashboardData}
        notifications={notifications}
        isLive={isLive}
        clearNotifications={clearNotifications}
        markNotificationAsRead={markNotificationAsRead}
      />

      <DashboardFooterSection
        dashboardData={dashboardData}
        notifications={notifications}
        filters={filters}
        isLive={isLive}
      />
    </>
  );
};
