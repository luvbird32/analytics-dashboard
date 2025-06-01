
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { EnhancedMetricCard } from '@/components/dashboard/EnhancedMetricCard';
import { LiveChart } from '@/components/dashboard/LiveChart';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { TrafficChart } from '@/components/dashboard/TrafficChart';
import { AreaChart } from '@/components/dashboard/AreaChart';
import { RadarChart } from '@/components/dashboard/RadarChart';
import { NotificationPanel } from '@/components/dashboard/NotificationPanel';
import { DashboardControls } from '@/components/dashboard/DashboardControls';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, Activity, TrendingUp } from 'lucide-react';

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
    toggleLiveData,
    refreshData,
    clearNotifications,
    markNotificationAsRead
  } = useRealTimeData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground p-6">
      <div className="max-w-8xl mx-auto space-y-8">
        {/* Enhanced Header with Status Indicators */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Enterprise Analytics Hub
              </h1>
              <Badge variant="outline" className="px-3 py-1">
                <Activity className="h-3 w-3 mr-1" />
                Advanced
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              Real-time data visualization platform demonstrating enterprise-grade capabilities
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <BarChart className="h-4 w-4" />
                6 Chart Types
              </span>
              <span className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                Real-time Updates
              </span>
              <span className="flex items-center gap-1">
                <PieChart className="h-4 w-4" />
                Advanced Analytics
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Performance Tracking
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-end gap-3">
            <DashboardControls
              isLive={isLive}
              onToggleLive={toggleLiveData}
              onRefresh={refreshData}
            />
          </div>
        </div>

        {/* Enhanced Performance Metrics Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {performanceMetrics.map((metric) => (
              <EnhancedMetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Primary Chart - Full Width on Large Screens */}
          <div className="xl:col-span-2">
            <LiveChart data={metrics} isLive={isLive} />
          </div>
          
          {/* Notifications Panel */}
          <div className="xl:col-span-1">
            <NotificationPanel
              notifications={notifications}
              onClear={clearNotifications}
              onMarkAsRead={markNotificationAsRead}
            />
          </div>
        </div>

        {/* Secondary Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart data={salesData} />
          <TrafficChart data={trafficData} />
        </div>

        {/* Advanced Analytics Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Advanced Analytics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AreaChart data={areaData} />
            <RadarChart data={radarData} />
          </div>
        </div>

        {/* Dashboard Statistics Footer */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{metrics.length}</p>
                <p className="text-sm text-muted-foreground">Data Points</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{performanceMetrics.length}</p>
                <p className="text-sm text-muted-foreground">KPI Metrics</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{notifications.length}</p>
                <p className="text-sm text-muted-foreground">Live Alerts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {isLive ? '1.5s' : 'Paused'}
                </p>
                <p className="text-sm text-muted-foreground">Update Interval</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
