
import React, { Suspense } from 'react';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { LoadingProvider, DashboardSkeleton } from '@/components/LoadingProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useOptimizedRealTimeData } from '@/hooks/useOptimizedRealTimeData';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { MetricsSection } from '@/components/dashboard/MetricsSection';
import { ChartsGrid } from '@/components/dashboard/ChartsGrid';
import { DashboardFooter } from '@/components/dashboard/DashboardFooter';

/**
 * Main dashboard component with optimized state management
 */
const DashboardContent = () => {
  const {
    isLive,
    metrics,
    salesData,
    trafficData,
    performanceMetrics,
    areaData,
    radarData,
    notifications,
    filters,
    treemapData,
    scatterData,
    funnelData,
    gaugeData,
    sankeyData,
    candlestickData,
    donutData,
    barData,
    sentimentData,
    engagementData,
    cryptoData,
    hashtagData,
    isLoading,
    error,
    toggleLiveData,
    refreshData,
    clearNotifications,
    markNotificationAsRead,
    setFilters,
    handleExport,
  } = useOptimizedRealTimeData();

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground flex items-center justify-center">
        <ErrorBoundary />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      <div className="container mx-auto p-4 lg:p-6 xl:p-8 max-w-[1920px]">
        <div className="space-y-6 lg:space-y-8">
          {/* Header with Controls and Filters */}
          <ErrorBoundary>
            <DashboardHeader
              isLive={isLive}
              filters={filters}
              onToggleLive={toggleLiveData}
              onRefresh={refreshData}
              onFiltersChange={setFilters}
              onExport={handleExport}
            />
          </ErrorBoundary>

          {/* Performance Metrics Section */}
          <ErrorBoundary>
            <MetricsSection
              performanceMetrics={performanceMetrics}
              filters={filters}
              onFiltersChange={setFilters}
              onExport={handleExport}
            />
          </ErrorBoundary>

          {/* Charts Grid Layout */}
          <ErrorBoundary>
            <Suspense fallback={<DashboardSkeleton />}>
              <ChartsGrid
                metrics={metrics}
                salesData={salesData}
                trafficData={trafficData}
                areaData={areaData}
                radarData={radarData}
                notifications={notifications}
                treemapData={treemapData}
                scatterData={scatterData}
                funnelData={funnelData}
                gaugeData={gaugeData}
                sankeyData={sankeyData}
                candlestickData={candlestickData}
                donutData={donutData}
                barData={barData}
                sentimentData={sentimentData}
                engagementData={engagementData}
                cryptoData={cryptoData}
                hashtagData={hashtagData}
                isLive={isLive}
                onClearNotifications={clearNotifications}
                onMarkNotificationAsRead={markNotificationAsRead}
              />
            </Suspense>
          </ErrorBoundary>

          {/* Dashboard Statistics Footer */}
          <ErrorBoundary>
            <DashboardFooter
              metrics={metrics}
              performanceMetrics={performanceMetrics}
              notifications={notifications}
              filters={filters}
              isLive={isLive}
            />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

/**
 * Enterprise-Grade Real-time Analytics Dashboard
 * Comprehensive data visualization platform with optimized state management
 */
const Index = () => {
  return (
    <ErrorBoundary>
      <DashboardProvider>
        <LoadingProvider>
          <DashboardContent />
        </LoadingProvider>
      </DashboardProvider>
    </ErrorBoundary>
  );
};

export default Index;
