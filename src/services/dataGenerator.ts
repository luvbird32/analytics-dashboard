
import { 
  MetricData, 
  SalesData, 
  TrafficData, 
  PerformanceMetric, 
  HeatmapData, 
  RadarData, 
  AreaData,
  TreemapData,
  ScatterData,
  FunnelData,
  GaugeData,
  CandlestickData,
  SankeyData,
  DonutData,
  BarData,
  SentimentData,
  EngagementData,
  CryptoData,
  HashtagData
} from '@/types/dashboard';
import { MetricsService } from './core/metricsService';
import { SocialMediaService } from './social/socialMediaService';
import { CryptoService } from './crypto/cryptoService';
import { AdvancedChartsService } from './charts/advancedChartsService';

/**
 * Main data generation service orchestrator
 * Delegates to specialized services for different data domains
 */
export class DataGeneratorService {
  // Core Metrics
  static generatePerformanceMetrics = MetricsService.generatePerformanceMetrics;
  static generateSalesData = MetricsService.generateSalesData;
  static generateTrafficData = MetricsService.generateTrafficData;
  static generateRadarData = MetricsService.generateRadarData;
  static generateAreaData = MetricsService.generateAreaData;
  static generateInitialMetrics = MetricsService.generateInitialMetrics;
  static generateNewMetric = MetricsService.generateNewMetric;

  // Social Media Analytics
  static generateSentimentData = SocialMediaService.generateSentimentData;
  static generateEngagementData = SocialMediaService.generateEngagementData;
  static generateHashtagData = SocialMediaService.generateHashtagData;

  // Cryptocurrency Analytics
  static generateCryptoData = CryptoService.generateCryptoData;
  static generateCandlestickData = CryptoService.generateCandlestickData;

  // Advanced Charts
  static generateTreemapData = AdvancedChartsService.generateTreemapData;
  static generateScatterData = AdvancedChartsService.generateScatterData;
  static generateFunnelData = AdvancedChartsService.generateFunnelData;
  static generateGaugeData = AdvancedChartsService.generateGaugeData;
  static generateSankeyData = AdvancedChartsService.generateSankeyData;
  static generateDonutData = AdvancedChartsService.generateDonutData;
  static generateBarData = AdvancedChartsService.generateBarData;
}
