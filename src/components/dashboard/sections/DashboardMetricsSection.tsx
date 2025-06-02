
import React, { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { DashboardSkeleton } from '@/components/LoadingProvider';
import { MetricsSection } from '../MetricsSection';

interface DashboardMetricsSectionProps {
  performanceMetrics: any[];
  filters: any;
  setFilters: (filters: any) => void;
}

/**
 * Focused metrics section component
 */
export const DashboardMetricsSection = ({
  performanceMetrics,
  filters,
  setFilters
}: DashboardMetricsSectionProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<DashboardSkeleton />}>
        <MetricsSection
          performanceMetrics={performanceMetrics}
          filters={filters}
          onFiltersChange={setFilters}
          onExport={() => console.log('Export metrics')}
        />
      </Suspense>
    </ErrorBoundary>
  );
};
