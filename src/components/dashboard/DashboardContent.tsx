
import React, { useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashboardData } from '@/hooks/useDashboardData';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { DashboardSkeleton } from '@/components/LoadingProvider';
import { DashboardHeader } from './DashboardHeader';
import { MetricsSection } from './MetricsSection';
import { ChartsGrid } from './ChartsGrid';
import { DashboardFooter } from './DashboardFooter';

/**
 * Main dashboard content component following best practices
 * - Single responsibility: Orchestrates dashboard layout
 * - Proper error handling and loading states
 * - Clean separation of concerns
 */
export const DashboardContent = () => {
  const {
    isLive,
    filters,
    notifications,
    isLoading,
    error,
    initializeData,
    toggleLiveData,
    setFilters,
    clearNotifications,
    markNotificationAsRead
  } = useDashboardData();

  // Initialize data on mount
  useEffect(() => {
    const data = initializeData();
    if (!data) {
      console.error('Failed to initialize dashboard data');
    }
  }, [initializeData]);

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => initializeData()}>
              Retry
            </Button>
            <Button asChild variant="outline">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto p-4 lg:p-6 xl:p-8 max-w-[1920px]">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      <div className="container mx-auto p-4 lg:p-6 xl:p-8 max-w-[1920px]">
        <div className="space-y-6 lg:space-y-8">
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

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
                performanceMetrics={[]}
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
                metrics={[]}
                salesData={[]}
                trafficData={[]}
                areaData={[]}
                radarData={[]}
                notifications={notifications}
                treemapData={[]}
                scatterData={[]}
                funnelData={[]}
                gaugeData={[]}
                sankeyData={[]}
                candlestickData={[]}
                donutData={[]}
                barData={[]}
                sentimentData={[]}
                engagementData={[]}
                cryptoData={[]}
                hashtagData={[]}
                isLive={isLive}
                onClearNotifications={clearNotifications}
                onMarkNotificationAsRead={markNotificationAsRead}
              />
            </Suspense>
          </ErrorBoundary>

          {/* Dashboard Footer */}
          <ErrorBoundary>
            <DashboardFooter
              metrics={[]}
              performanceMetrics={[]}
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
