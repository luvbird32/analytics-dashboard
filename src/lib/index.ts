
/**
 * Analytics Dashboard Component Library
 * 
 * A collection of reusable React components and hooks for building
 * analytics dashboards with charts, metrics, and real-time data.
 */

// Core Components
export { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
export { DashboardHeader } from '@/components/dashboard/DashboardHeader';
export { DashboardFooter } from '@/components/dashboard/DashboardFooter';
export { MetricsSection } from '@/components/dashboard/MetricsSection';
export { ChartsGrid } from '@/components/dashboard/ChartsGrid';

// Chart Components
export { LiveChart } from '@/components/dashboard/LiveChart';
export { SalesChart } from '@/components/dashboard/SalesChart';
export { TrafficChart } from '@/components/dashboard/TrafficChart';
export { AreaChart } from '@/components/dashboard/AreaChart';
export { RadarChart } from '@/components/dashboard/RadarChart';
export { TreemapChart } from '@/components/dashboard/charts/TreemapChart';
export { FunnelChart } from '@/components/dashboard/charts/FunnelChart';
export { DonutChart } from '@/components/dashboard/charts/DonutChart';
export { GaugeChart } from '@/components/dashboard/charts/GaugeChart';
export { CandlestickChart } from '@/components/dashboard/charts/CandlestickChart';
export { SankeyChart } from '@/components/dashboard/charts/SankeyChart';
export { BarChart } from '@/components/dashboard/charts/BarChart';
export { ScatterChart } from '@/components/dashboard/charts/ScatterChart';
export { CryptoChart } from '@/components/dashboard/charts/CryptoChart';
export { EngagementChart } from '@/components/dashboard/charts/EngagementChart';
export { SentimentChart } from '@/components/dashboard/charts/SentimentChart';
export { HashtagChart } from '@/components/dashboard/charts/HashtagChart';

// UI Components
export { MetricCard } from '@/components/dashboard/MetricCard';
export { EnhancedMetricCard } from '@/components/dashboard/EnhancedMetricCard';
export { NotificationPanel } from '@/components/dashboard/NotificationPanel';
export { DashboardControls } from '@/components/dashboard/DashboardControls';
export { DashboardFilters } from '@/components/dashboard/DashboardFilters';

// Filter Components
export { DateRangeFilter } from '@/components/dashboard/filters/DateRangeFilter';
export { CategoryFilter } from '@/components/dashboard/filters/CategoryFilter';
export { RegionFilter } from '@/components/dashboard/filters/RegionFilter';
export { UserTypeFilter } from '@/components/dashboard/filters/UserTypeFilter';
export { ExportOptions } from '@/components/dashboard/filters/ExportOptions';
export { SanitizedFilterInput } from '@/components/dashboard/filters/SanitizedFilterInput';

// Analytics Components
export { RevenueAnalytics } from '@/components/dashboard/analytics/RevenueAnalytics';
export { UserBehaviorAnalytics } from '@/components/dashboard/analytics/UserBehaviorAnalytics';
export { DetailedAnalyticsSection } from '@/components/dashboard/analytics/DetailedAnalyticsSection';

// Hooks
export { useMetricsData } from '@/hooks/useMetricsData';
export { useChartsData } from '@/hooks/useChartsData';
export { useSocialCryptoData } from '@/hooks/useSocialCryptoData';
export { useNotifications } from '@/hooks/useNotifications';
export { useDashboardState } from '@/hooks/useDashboardState';
export { useDataInitialization } from '@/hooks/useDataInitialization';
export { useRealTimeCoordinator } from '@/hooks/useRealTimeCoordinator';
export { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';
export { useDashboardDataManager } from '@/hooks/useDashboardDataManager';
export { useDashboardActions } from '@/hooks/useDashboardActions';
export { useSanitizedInput } from '@/hooks/useSanitizedInput';
export { useSecureStorage } from '@/hooks/useSecureStorage';

// Services
export { MetricsService } from '@/services/core/metricsService';
export { BasicChartsService } from '@/services/charts/basicChartsService';
export { AdvancedChartsService } from '@/services/charts/advancedChartsService';
export { FinancialChartsService } from '@/services/charts/financialChartsService';
export { CryptoService } from '@/services/crypto/cryptoService';
export { SocialMediaService } from '@/services/social/socialMediaService';
export { NotificationService } from '@/services/notificationService';
export { SanitizationService } from '@/services/security/sanitizationService';
export { DetailedAnalyticsService } from '@/services/analytics/detailedAnalyticsService';

// Utilities
export { FilterUtils } from '@/utils/filterUtils';
export { chartMemoization } from '@/utils/chartMemoization';
export { errorUtils } from '@/utils/errorUtils';
export { securityUtils } from '@/utils/securityUtils';
export { xssProtection } from '@/utils/xssProtection';

// Types
export type {
  DashboardFilters,
  MetricData,
  PerformanceMetricData,
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
  CryptoData,
  SentimentData,
  EngagementData,
  HashtagData,
  NotificationData
} from '@/types/dashboard';

// Context
export { DashboardProvider, useDashboard } from '@/contexts/DashboardContext';
