
/**
 * Dashboard data types and interfaces
 */

export interface MetricData {
  timestamp: string;
  value: number;
  label: string;
}

export interface SalesData {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
}

export interface TrafficData {
  name: string;
  value: number;
  color: string;
}

export interface PerformanceMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}
