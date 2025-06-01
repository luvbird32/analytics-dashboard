import { MainChartsSection } from './sections/MainChartsSection';
import { SalesTrafficSection } from './sections/SalesTrafficSection';
import { SocialMediaSection } from './sections/SocialMediaSection';
import { CryptocurrencySection } from './sections/CryptocurrencySection';
import { AdvancedAnalyticsSection } from './sections/AdvancedAnalyticsSection';
import { SpecializedChartsSection } from './sections/SpecializedChartsSection';
import { DetailedAnalyticsSection } from './analytics/DetailedAnalyticsSection';
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
 * Organized charts grid layout with consistent spacing
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
    <div className="space-y-12 lg:space-y-16">
      {/* Main Charts Section */}
      <MainChartsSection
        metrics={metrics}
        notifications={notifications}
        isLive={isLive}
        onClearNotifications={onClearNotifications}
        onMarkNotificationAsRead={onMarkNotificationAsRead}
      />

      {/* Detailed Analytics Section */}
      <DetailedAnalyticsSection />

      {/* Sales & Traffic Charts */}
      <SalesTrafficSection
        salesData={salesData}
        trafficData={trafficData}
      />

      {/* Social Media Analytics */}
      <SocialMediaSection
        sentimentData={sentimentData}
        engagementData={engagementData}
        hashtagData={hashtagData}
      />

      {/* Cryptocurrency Analytics */}
      <CryptocurrencySection
        cryptoData={cryptoData}
        candlestickData={candlestickData}
      />

      {/* Advanced Analytics */}
      <AdvancedAnalyticsSection
        areaData={areaData}
        radarData={radarData}
        sankeyData={sankeyData}
      />

      {/* Specialized Charts */}
      <SpecializedChartsSection
        treemapData={treemapData}
        scatterData={scatterData}
        funnelData={funnelData}
        gaugeData={gaugeData}
        donutData={donutData}
        barData={barData}
      />
    </div>
  );
};
