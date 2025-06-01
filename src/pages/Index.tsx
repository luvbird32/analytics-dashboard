
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { MetricsSection } from '@/components/dashboard/MetricsSection';
import { ChartsGrid } from '@/components/dashboard/ChartsGrid';
import { DashboardFooter } from '@/components/dashboard/DashboardFooter';

/**
 * Enterprise-Grade Real-time Analytics Dashboard
 * Comprehensive data visualization platform showcasing advanced capabilities
 * Built to impress and demonstrate technical excellence
 */
const Index = () => {
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
    toggleLiveData,
    refreshData,
    clearNotifications,
    markNotificationAsRead,
    setFilters,
    handleExport,
  } = useRealTimeData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      <div className="container mx-auto p-4 lg:p-6 xl:p-8 max-w-[1920px]">
        <div className="space-y-6 lg:space-y-8">
          {/* Header with Controls and Filters */}
          <DashboardHeader
            isLive={isLive}
            filters={filters}
            onToggleLive={toggleLiveData}
            onRefresh={refreshData}
            onFiltersChange={setFilters}
            onExport={handleExport}
          />

          {/* Performance Metrics Section */}
          <MetricsSection
            performanceMetrics={performanceMetrics}
            filters={filters}
            onFiltersChange={setFilters}
            onExport={handleExport}
          />

          {/* Charts Grid Layout */}
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

          {/* Dashboard Statistics Footer */}
          <DashboardFooter
            metrics={metrics}
            performanceMetrics={performanceMetrics}
            notifications={notifications}
            filters={filters}
            isLive={isLive}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
