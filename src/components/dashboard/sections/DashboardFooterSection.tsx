
import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { DashboardFooter } from '../DashboardFooter';

interface DashboardFooterSectionProps {
  dashboardData: any;
  notifications: any[];
  filters: any;
  isLive: boolean;
}

/**
 * Focused footer section component
 */
export const DashboardFooterSection = ({
  dashboardData,
  notifications,
  filters,
  isLive
}: DashboardFooterSectionProps) => {
  return (
    <ErrorBoundary>
      <DashboardFooter
        metrics={dashboardData?.metrics || []}
        performanceMetrics={dashboardData?.performanceMetrics || []}
        notifications={notifications || []}
        filters={filters}
        isLive={isLive}
      />
    </ErrorBoundary>
  );
};
