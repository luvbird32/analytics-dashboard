
import { useMemo } from 'react';
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

interface UseChartsGridDataProps {
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
 * Hook to organize and memoize charts grid data
 */
export const useChartsGridData = (props: UseChartsGridDataProps) => {
  const sectionsData = useMemo(() => ({
    main: {
      metrics: props.metrics,
      notifications: props.notifications,
      isLive: props.isLive,
      onClearNotifications: props.onClearNotifications,
      onMarkNotificationAsRead: props.onMarkNotificationAsRead
    },
    salesTraffic: {
      salesData: props.salesData,
      trafficData: props.trafficData
    },
    social: {
      sentimentData: props.sentimentData,
      engagementData: props.engagementData,
      hashtagData: props.hashtagData
    },
    crypto: {
      cryptoData: props.cryptoData,
      candlestickData: props.candlestickData
    },
    advanced: {
      areaData: props.areaData,
      radarData: props.radarData,
      sankeyData: props.sankeyData
    },
    specialized: {
      treemapData: props.treemapData,
      scatterData: props.scatterData,
      funnelData: props.funnelData,
      gaugeData: props.gaugeData,
      donutData: props.donutData,
      barData: props.barData
    }
  }), [
    props.metrics,
    props.notifications,
    props.isLive,
    props.onClearNotifications,
    props.onMarkNotificationAsRead,
    props.salesData,
    props.trafficData,
    props.sentimentData,
    props.engagementData,
    props.hashtagData,
    props.cryptoData,
    props.candlestickData,
    props.areaData,
    props.radarData,
    props.sankeyData,
    props.treemapData,
    props.scatterData,
    props.funnelData,
    props.gaugeData,
    props.donutData,
    props.barData
  ]);

  return sectionsData;
};
