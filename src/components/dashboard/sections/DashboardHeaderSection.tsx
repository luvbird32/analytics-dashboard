
import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { DashboardHeader } from '../DashboardHeader';

interface DashboardHeaderSectionProps {
  isLive: boolean;
  filters: any;
  toggleLiveData: () => void;
  initializeData: () => void;
  setFilters: (filters: any) => void;
}

/**
 * Focused header section component
 */
export const DashboardHeaderSection = ({
  isLive,
  filters,
  toggleLiveData,
  initializeData,
  setFilters
}: DashboardHeaderSectionProps) => {
  return (
    <ErrorBoundary>
      <DashboardHeader
        isLive={isLive}
        filters={filters}
        onToggleLive={toggleLiveData}
        onRefresh={initializeData}
        onFiltersChange={setFilters}
        onExport={() => console.log('Export functionality')}
      />
    </ErrorBoundary>
  );
};
