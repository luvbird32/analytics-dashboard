
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { LiveChart } from '@/components/dashboard/LiveChart';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { TrafficChart } from '@/components/dashboard/TrafficChart';
import { DashboardControls } from '@/components/dashboard/DashboardControls';

/**
 * Real-time Data Visualization Dashboard
 * Showcases Recharts integration with live data updates
 */
const Index = () => {
  const {
    isLive,
    metrics,
    salesData,
    trafficData,
    performanceMetrics,
    toggleLiveData,
    refreshData
  } = useRealTimeData();

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Real-time data visualization with Recharts</p>
          </div>
          <DashboardControls
            isLive={isLive}
            onToggleLive={toggleLiveData}
            onRefresh={refreshData}
          />
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <LiveChart data={metrics} isLive={isLive} />
          </div>
          <SalesChart data={salesData} />
          <TrafficChart data={trafficData} />
        </div>
      </div>
    </div>
  );
};

export default Index;
