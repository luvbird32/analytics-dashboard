
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
    <div className="space-y-6 lg:space-y-8">
      {/* Main Charts Grid - Desktop Optimized */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
        <div className="xl:col-span-3">
          <LiveChart data={metrics} isLive={isLive} />
        </div>
        <div className="xl:col-span-1">
          <NotificationPanel
            notifications={notifications}
            onClear={onClearNotifications}
            onMarkAsRead={onMarkNotificationAsRead}
          />
        </div>
      </div>

      {/* Secondary Charts - Desktop Enhanced */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        <SalesChart data={salesData} />
        <TrafficChart data={trafficData} />
      </div>

      {/* Social Media Analytics Section */}
      <div className="space-y-4 lg:space-y-6">
        <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
          <Users className="h-5 w-5 lg:h-6 lg:w-6" />
          Social Media Analytics
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          <SentimentChart data={sentimentData} />
          <EngagementChart data={engagementData} />
        </div>
        <div className="grid grid-cols-1">
          <HashtagChart data={hashtagData} />
        </div>
      </div>

      {/* Cryptocurrency Analytics Section */}
      <div className="space-y-4 lg:space-y-6">
        <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
          <DollarSign className="h-5 w-5 lg:h-6 lg:w-6" />
          Cryptocurrency Analytics
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          <CryptoChart data={cryptoData} symbol="BTC" />
          <CandlestickChart data={candlestickData} />
        </div>
      </div>

      {/* Advanced Analytics Section */}
      <div className="space-y-4 lg:space-y-6">
        <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
          <Activity className="h-5 w-5 lg:h-6 lg:w-6" />
          Advanced Analytics
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          <AreaChart data={areaData} />
          <RadarChart data={radarData} />
          <SankeyChart data={sankeyData} />
        </div>
      </div>

      {/* Specialized Charts - Desktop Grid */}
      <div className="space-y-4 lg:space-y-6">
        <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
          <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6" />
          Specialized Visualizations
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
          <TreemapChart data={treemapData} />
          <ScatterChart data={scatterData} />
          <FunnelChart data={funnelData} />
          <GaugeChart data={gaugeData} />
          <DonutChart data={donutData} />
          <BarChart data={barData} />
        </div>
      </div>
    </div>
  );
};
