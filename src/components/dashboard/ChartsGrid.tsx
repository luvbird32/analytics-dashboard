
import { Activity, TrendingUp } from 'lucide-react';
import { LiveChart } from './LiveChart';
import { NotificationPanel } from './NotificationPanel';
import { SalesChart } from './SalesChart';
import { TrafficChart } from './TrafficChart';
import { AreaChart } from './AreaChart';
import { RadarChart } from './RadarChart';
import { TreemapChart } from './charts/TreemapChart';
import { ScatterChart } from './charts/ScatterChart';
import { FunnelChart } from './charts/FunnelChart';
import { GaugeChart } from './charts/GaugeChart';
import { DonutChart } from './charts/DonutChart';
import { BarChart } from './charts/BarChart';
import { SankeyChart } from './charts/SankeyChart';
import { CandlestickChart } from './charts/CandlestickChart';
import {
  MetricData,
  SalesData,
  TrafficData,
  AreaData,
  RadarData,
  NotificationData,
  TreemapData,
  ScatterData,
  FunnelData,
  GaugeData,
  SankeyData,
  CandlestickData,
  DonutData,
  BarData
} from '@/types/dashboard';

interface ChartsGridProps {
  metrics: MetricData[];
  salesData: SalesData[];
  trafficData: TrafficData[];
  areaData: AreaData[];
  radarData: RadarData[];
  notifications: NotificationData[];
  treemapData: TreemapData[];
  scatterData: ScatterData[];
  funnelData: FunnelData[];
  gaugeData: GaugeData[];
  sankeyData: SankeyData;
  candlestickData: CandlestickData[];
  donutData: DonutData[];
  barData: BarData[];
  isLive: boolean;
  onClearNotifications: () => void;
  onMarkNotificationAsRead: (id: string) => void;
}

/**
 * Organized charts grid layout with responsive design
 */
export const ChartsGrid = ({
  metrics,
  salesData,
  trafficData,
  areaData,
  radarData,
  notifications,
  treemapData,
  scatterData,
  funnelData,
  gaugeData,
  sankeyData,
  candlestickData,
  donutData,
  barData,
  isLive,
  onClearNotifications,
  onMarkNotificationAsRead
}: ChartsGridProps) => {
  return (
    <>
      {/* Main Charts Grid - Mobile Optimized */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <LiveChart data={metrics} isLive={isLive} />
        </div>
        <div className="lg:col-span-1">
          <NotificationPanel
            notifications={notifications}
            onClear={onClearNotifications}
            onMarkAsRead={onMarkNotificationAsRead}
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
    </>
  );
};
