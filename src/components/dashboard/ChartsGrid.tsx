
import React from 'react';
import { MainChartsSection } from './sections/MainChartsSection';
import { SalesTrafficSection } from './sections/SalesTrafficSection';
import { SocialMediaSection } from './sections/SocialMediaSection';
import { CryptocurrencySection } from './sections/CryptocurrencySection';
import { AdvancedAnalyticsSection } from './sections/AdvancedAnalyticsSection';
import { SpecializedChartsSection } from './sections/SpecializedChartsSection';
import { EChartsSection } from './sections/EChartsSection';
import { DetailedAnalyticsSection } from './analytics/DetailedAnalyticsSection';
import { useChartsGridData } from '@/hooks/useChartsGridData';
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
export const ChartsGrid: React.FC<ChartsGridProps> = (props) => {
  const sectionsData = useChartsGridData(props);

  return (
    <div className="space-y-12 lg:space-y-16">
      <MainChartsSection {...sectionsData.main} />
      <EChartsSection />
      <DetailedAnalyticsSection />
      <SalesTrafficSection {...sectionsData.salesTraffic} />
      <SocialMediaSection {...sectionsData.social} />
      <CryptocurrencySection {...sectionsData.crypto} />
      <AdvancedAnalyticsSection {...sectionsData.advanced} />
      <SpecializedChartsSection {...sectionsData.specialized} />
    </div>
  );
};
