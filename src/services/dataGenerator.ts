
import { BasicChartsService } from './charts/basicChartsService';
import { AdvancedChartsService } from './charts/advancedChartsService';
import { FinancialChartsService } from './charts/financialChartsService';
import { MetricsChartsService } from './charts/metricsChartsService';

/**
 * Main data generation service that orchestrates specialized chart services
 * @deprecated Use specialized chart services directly instead
 */
export class DataGeneratorService {
  // Basic charts
  static generateSalesData = BasicChartsService.generateSalesData;
  static generateTrafficData = BasicChartsService.generateTrafficData;
  static generateRadarData = BasicChartsService.generateRadarData;
  static generateAreaData = BasicChartsService.generateAreaData;

  // Advanced charts
  static generateTreemapData = AdvancedChartsService.generateTreemapData;
  static generateScatterData = AdvancedChartsService.generateScatterData;
  static generateFunnelData = AdvancedChartsService.generateFunnelData;
  static generateGaugeData = AdvancedChartsService.generateGaugeData;

  // Financial charts
  static generateSankeyData = FinancialChartsService.generateSankeyData;
  static generateCandlestickData = FinancialChartsService.generateCandlestickData;
  static generateDonutData = FinancialChartsService.generateDonutData;
  static generateBarData = FinancialChartsService.generateBarData;

  // Metrics
  static generateInitialMetrics = MetricsChartsService.generateInitialMetrics;
  static generateNewMetric = MetricsChartsService.generateNewMetric;
}
