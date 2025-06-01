/**
 * Comprehensive dashboard data types and interfaces
 * Supporting advanced analytics and real-time visualizations
 */

export interface MetricData {
  timestamp: string;
  value: number;
  label: string;
  category?: string;
  metadata?: Record<string, any>;
}

export interface SalesData {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
  profit: number;
  expenses: number;
  target: number;
}

export interface TrafficData {
  name: string;
  value: number;
  color: string;
  growth: number;
  sessions: number;
}

export interface PerformanceMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
  target?: number;
  category: 'revenue' | 'users' | 'performance' | 'conversion';
  priority: 'high' | 'medium' | 'low';
}

export interface HeatmapData {
  day: string;
  hour: number;
  value: number;
  intensity: number;
}

export interface RadarData {
  metric: string;
  current: number;
  previous: number;
  fullMark: number;
}

export interface AreaData {
  name: string;
  desktop: number;
  mobile: number;
  tablet: number;
  total: number;
}

export interface NotificationData {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
    icon?: string;
  };
}

export interface DashboardFilters {
  dateRange: 'today' | '7d' | '30d' | '90d' | 'custom';
  category: string[];
  region: string[];
  userType: string[];
}

export interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv' | 'png';
  includeCharts: boolean;
  dateRange: string;
}

export interface TreemapData {
  name: string;
  value: number;
  color: string;
  children?: TreemapData[];
}

export interface ScatterData {
  x: number;
  y: number;
  z: number;
  category: string;
}

export interface FunnelData {
  name: string;
  value: number;
  conversion: number;
}

export interface GaugeData {
  name: string;
  value: number;
  max: number;
  segments: { min: number; max: number; color: string; label: string }[];
}

export interface SankeyData {
  nodes: { id: string; name: string }[];
  links: { source: string; target: string; value: number }[];
}

export interface CandlestickData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface NetworkData {
  nodes: { id: string; name: string; group: number; size: number }[];
  links: { source: string; target: string; value: number }[];
}

export interface DonutData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export interface BarData {
  name: string;
  value: number;
  target?: number;
  category: string;
}

export interface SentimentData {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
  overall: number;
}

export interface EngagementData {
  platform: string;
  likes: number;
  shares: number;
  comments: number;
  reach: number;
  engagement_rate: number;
}

export interface CryptoData {
  timestamp: string;
  price: number;
  volume: number;
  marketCap: number;
  change24h: number;
}

export interface HashtagData {
  tag: string;
  mentions: number;
  sentiment: number;
  trend: 'up' | 'down' | 'stable';
}

export interface VolumeProfileData {
  price: number;
  volume: number;
  buyVolume: number;
  sellVolume: number;
}
