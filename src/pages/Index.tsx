
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { EnhancedMetricCard } from '@/components/dashboard/EnhancedMetricCard';
import { LiveChart } from '@/components/dashboard/LiveChart';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { TrafficChart } from '@/components/dashboard/TrafficChart';
import { AreaChart } from '@/components/dashboard/AreaChart';
import { RadarChart } from '@/components/dashboard/RadarChart';
import { NotificationPanel } from '@/components/dashboard/NotificationPanel';
import { DashboardControls } from '@/components/dashboard/DashboardControls';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { BarChart as IconBarChart, LineChart, PieChart, Activity, TrendingUp, Filter, Menu } from 'lucide-react';
import { TreemapChart } from '@/components/dashboard/charts/TreemapChart';
import { ScatterChart } from '@/components/dashboard/charts/ScatterChart';
import { FunnelChart } from '@/components/dashboard/charts/FunnelChart';
import { GaugeChart } from '@/components/dashboard/charts/GaugeChart';
import { SankeyChart } from '@/components/dashboard/charts/SankeyChart';
import { CandlestickChart } from '@/components/dashboard/charts/CandlestickChart';
import { DonutChart } from '@/components/dashboard/charts/DonutChart';
import { BarChart } from '@/components/dashboard/charts/BarChart';

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
    toggleLiveData,
    refreshData,
    clearNotifications,
    markNotificationAsRead,
    setFilters,
    handleExport,
    donutData,
    barData,
  } = useRealTimeData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground p-3 sm:p-6">
      <div className="max-w-8xl mx-auto space-y-4 sm:space-y-8">
        {/* Mobile-Optimized Header */}
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Enterprise Analytics Hub
              </h1>
              <Badge variant="outline" className="px-2 py-1 text-xs sm:px-3">
                <Activity className="h-3 w-3 mr-1" />
                Advanced
              </Badge>
            </div>
            <p className="text-sm sm:text-lg text-muted-foreground">
              Real-time data visualization platform demonstrating enterprise-grade capabilities
            </p>
            
            {/* Mobile-friendly Feature List */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <IconBarChart className="h-3 w-3 sm:h-4 sm:w-4" />
                12+ Charts
              </span>
              <span className="flex items-center gap-1">
                <LineChart className="h-3 w-3 sm:h-4 sm:w-4" />
                Real-time
              </span>
              <span className="flex items-center gap-1">
                <PieChart className="h-3 w-3 sm:h-4 sm:w-4" />
                Analytics
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                Performance
              </span>
            </div>
          </div>
          
          {/* Mobile Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1">
              <DashboardControls
                isLive={isLive}
                onToggleLive={toggleLiveData}
                onRefresh={refreshData}
              />
            </div>
            
            {/* Mobile Filters Drawer */}
            <div className="sm:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters & Export
                    {(filters.category.length + filters.region.length + filters.userType.length) > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {filters.category.length + filters.region.length + filters.userType.length}
                      </Badge>
                    )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[80vh]">
                  <DrawerHeader>
                    <DrawerTitle>Dashboard Filters</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4 pb-4 overflow-y-auto">
                    <DashboardFilters
                      filters={filters}
                      onFiltersChange={setFilters}
                      onExport={handleExport}
                    />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>

        {/* Desktop Filters & Metrics Grid */}
        <div className="hidden sm:grid sm:grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-1">
            <DashboardFilters
              filters={filters}
              onFiltersChange={setFilters}
              onExport={handleExport}
            />
          </div>
          
          <div className="xl:col-span-3">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Metrics
                {filters.category.length > 0 && (
                  <Badge variant="secondary">
                    Filtered by {filters.category.length} categories
                  </Badge>
                )}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {performanceMetrics.map((metric) => (
                  <EnhancedMetricCard key={metric.id} metric={metric} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Metrics Grid */}
        <div className="sm:hidden space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Performance Metrics
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {performanceMetrics.slice(0, 4).map((metric) => (
              <EnhancedMetricCard key={metric.id} metric={metric} />
            ))}
          </div>
          {performanceMetrics.length > 4 && (
            <div className="text-center">
              <Button variant="outline" size="sm">
                View All Metrics ({performanceMetrics.length - 4} more)
              </Button>
            </div>
          )}
        </div>

        {/* Main Charts Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <LiveChart data={metrics} isLive={isLive} />
          </div>
          <div className="lg:col-span-1">
            <NotificationPanel
              notifications={notifications}
              onClear={clearNotifications}
              onMarkAsRead={markNotificationAsRead}
            />
          </div>
        </div>

        {/* Secondary Charts - Mobile Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <SalesChart data={salesData} />
          <TrafficChart data={trafficData} />
        </div>

        {/* Advanced Analytics */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
            Advanced Analytics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <AreaChart data={areaData} />
            <RadarChart data={radarData} />
          </div>
        </div>

        {/* Specialized Charts - Mobile Friendly Grid */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
            Specialized Visualizations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            <TreemapChart data={treemapData} />
            <ScatterChart data={scatterData} />
            <FunnelChart data={funnelData} />
            <GaugeChart data={gaugeData} />
            <DonutChart data={donutData} />
            <BarChart data={barData} />
            <div className="sm:col-span-2 xl:col-span-1">
              <SankeyChart data={sankeyData} />
            </div>
            <div className="sm:col-span-2 xl:col-span-1">
              <CandlestickChart data={candlestickData} />
            </div>
          </div>
        </div>

        {/* Dashboard Statistics Footer */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-primary">{metrics.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Data Points</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-primary">{performanceMetrics.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">KPI Metrics</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-primary">{notifications.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Live Alerts</p>
              </div>
              <div className="hidden sm:block">
                <p className="text-xl sm:text-2xl font-bold text-primary">
                  {filters.category.length + filters.region.length + filters.userType.length}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">Active Filters</p>
              </div>
              <div className="hidden lg:block">
                <p className="text-xl sm:text-2xl font-bold text-primary">
                  {isLive ? '1.5s' : 'Paused'}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">Update Interval</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
