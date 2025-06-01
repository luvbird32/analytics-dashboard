
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
