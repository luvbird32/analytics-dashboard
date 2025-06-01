
import { Activity, TrendingUp, Users, DollarSign } from 'lucide-react';
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
import { SentimentChart } from './charts/SentimentChart';
import { EngagementChart } from './charts/EngagementChart';
import { CryptoChart } from './charts/CryptoChart';
import { HashtagChart } from './charts/HashtagChart';
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
  BarData,
  SentimentData,
  EngagementData,
  CryptoData,
  HashtagData
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
  sentimentData: SentimentData[];
  engagementData: EngagementData[];
  cryptoData: CryptoData[];
  hashtagData: HashtagData[];
  isLive: boolean;
  onClearNotifications: () => void;
  onMarkNotificationAsRead: (id: string) => void;
}

/**
 * Organized charts grid layout with responsive design optimized for desktop
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
  sentimentData,
  engagementData,
  cryptoData,
  hashtagData,
  isLive,
  onClearNotifications,
  onMarkNotificationAsRead
}: ChartsGridProps) => {
  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Main Charts Section - Full Width */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
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

      {/* Sales & Traffic Charts - Full Width Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="w-full">
          <SalesChart data={salesData} />
        </div>
        <div className="w-full">
          <TrafficChart data={trafficData} />
        </div>
      </div>

      {/* Social Media Analytics Section - Full Width */}
      <div className="space-y-6 lg:space-y-8">
        <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
          <Users className="h-5 w-5 lg:h-6 lg:w-6" />
          Social Media Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="w-full">
            <SentimentChart data={sentimentData} />
          </div>
          <div className="w-full">
            <EngagementChart data={engagementData} />
          </div>
        </div>
        <div className="w-full">
          <HashtagChart data={hashtagData} />
        </div>
      </div>

      {/* Cryptocurrency Analytics Section - Full Width */}
      <div className="space-y-6 lg:space-y-8">
        <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
          <DollarSign className="h-5 w-5 lg:h-6 lg:w-6" />
          Cryptocurrency Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="w-full">
            <CryptoChart data={cryptoData} symbol="BTC" />
          </div>
          <div className="w-full">
            <CandlestickChart data={candlestickData} />
          </div>
        </div>
      </div>

      {/* Advanced Analytics Section - Full Width */}
      <div className="space-y-6 lg:space-y-8">
        <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
          <Activity className="h-5 w-5 lg:h-6 lg:w-6" />
          Advanced Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="w-full">
            <AreaChart data={areaData} />
          </div>
          <div className="w-full">
            <RadarChart data={radarData} />
          </div>
          <div className="w-full">
            <SankeyChart data={sankeyData} />
          </div>
        </div>
      </div>

      {/* Specialized Charts - Auto-sizing Grid */}
      <div className="space-y-6 lg:space-y-8">
        <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
          <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6" />
          Specialized Visualizations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="w-full">
            <TreemapChart data={treemapData} />
          </div>
          <div className="w-full">
            <ScatterChart data={scatterData} />
          </div>
          <div className="w-full">
            <FunnelChart data={funnelData} />
          </div>
          <div className="w-full">
            <GaugeChart data={gaugeData} />
          </div>
          <div className="w-full">
            <DonutChart data={donutData} />
          </div>
          <div className="w-full">
            <BarChart data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
};
