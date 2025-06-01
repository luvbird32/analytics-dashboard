
import { MetricsService } from './core/metricsService';
import { BasicChartsService } from './charts/basicChartsService';
import { AdvancedChartsService } from './charts/advancedChartsService';
import { FinancialChartsService } from './charts/financialChartsService';
import { SocialMediaService } from './social/socialMediaService';
import { CryptoService } from './crypto/cryptoService';
import { 
  MetricData, 
  PerformanceMetric, 
  SalesData, 
  TrafficData,
  AreaData,
  RadarData,
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

/**
 * Centralized service for all dashboard data operations
 * Follows single responsibility principle and provides clean API
 */
export class DashboardDataService {
  /**
   * Generate all initial dashboard data
   */
  static generateInitialData() {
    return {
      metrics: MetricsService.generateInitialMetrics(),
      performanceMetrics: MetricsService.generatePerformanceMetrics(),
      salesData: BasicChartsService.generateSalesData(),
      trafficData: BasicChartsService.generateTrafficData(),
      areaData: MetricsService.generateAreaData(),
      radarData: MetricsService.generateRadarData(),
      treemapData: AdvancedChartsService.generateTreemapData(),
      scatterData: AdvancedChartsService.generateScatterData(),
      funnelData: AdvancedChartsService.generateFunnelData(),
      gaugeData: AdvancedChartsService.generateGaugeData(),
      sankeyData: FinancialChartsService.generateSankeyData(),
      candlestickData: FinancialChartsService.generateCandlestickData(),
      donutData: FinancialChartsService.generateDonutData(),
      barData: FinancialChartsService.generateBarData(),
      sentimentData: SocialMediaService.generateSentimentData(),
      engagementData: SocialMediaService.generateEngagementData(),
      cryptoData: CryptoService.generateCryptoData(),
      hashtagData: SocialMediaService.generateHashtagData()
    };
  }

  /**
   * Update metrics with real-time data
   */
  static updateMetrics(currentMetrics: MetricData[]): MetricData[] {
    return currentMetrics.map(metric => ({
      ...metric,
      value: Math.floor(Math.random() * 10000),
      change: Math.floor(Math.random() * 200) - 100,
      trend: Math.random() > 0.5 ? 'up' : 'down'
    }));
  }

  /**
   * Update traffic data for real-time simulation
   */
  static updateTrafficData(currentData: TrafficData[]): TrafficData[] {
    return currentData.map(item => ({
      ...item,
      visitors: Math.floor(Math.random() * 5000),
      pageViews: Math.floor(Math.random() * 15000)
    }));
  }
}
