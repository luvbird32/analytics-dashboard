
import React, { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { DashboardSkeleton } from '@/components/LoadingProvider';
import { DashboardHeader } from '../DashboardHeader';
import { MetricsSection } from '../MetricsSection';
import { ChartsGrid } from '../ChartsGrid';
import { DashboardFooter } from '../DashboardFooter';

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
 * Dashboard sections wrapper with error boundaries and suspense
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
  return (
    <>
      {/* Dashboard Header */}
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

      {/* Metrics Section */}
      <ErrorBoundary>
        <Suspense fallback={<DashboardSkeleton />}>
          <MetricsSection
            performanceMetrics={dashboardData.performanceMetrics || []}
            filters={filters}
            onFiltersChange={setFilters}
            onExport={() => console.log('Export metrics')}
          />
        </Suspense>
      </ErrorBoundary>

      {/* Charts Grid */}
      <ErrorBoundary>
        <Suspense fallback={<DashboardSkeleton />}>
          <ChartsGrid
            metrics={dashboardData.metrics || []}
            salesData={dashboardData.salesData || []}
            trafficData={dashboardData.trafficData || []}
            areaData={dashboardData.areaData || []}
            radarData={dashboardData.radarData || []}
            notifications={notifications}
            treemapData={dashboardData.treemapData || []}
            scatterData={dashboardData.scatterData || []}
            funnelData={dashboardData.funnelData || []}
            gaugeData={dashboardData.gaugeData || []}
            sankeyData={dashboardData.sankeyData || { nodes: [], links: [] }}
            candlestickData={dashboardData.candlestickData || []}
            donutData={dashboardData.donutData || []}
            barData={dashboardData.barData || []}
            sentimentData={dashboardData.sentimentData || []}
            engagementData={dashboardData.engagementData || []}
            cryptoData={dashboardData.cryptoData || []}
            hashtagData={dashboardData.hashtagData || []}
            isLive={isLive}
            onClearNotifications={clearNotifications}
            onMarkNotificationAsRead={markNotificationAsRead}
          />
        </Suspense>
      </ErrorBoundary>

      {/* Dashboard Footer */}
      <ErrorBoundary>
        <DashboardFooter
          metrics={dashboardData.metrics || []}
          performanceMetrics={dashboardData.performanceMetrics || []}
          notifications={notifications}
          filters={filters}
          isLive={isLive}
        />
      </ErrorBoundary>
    </>
  );
};
