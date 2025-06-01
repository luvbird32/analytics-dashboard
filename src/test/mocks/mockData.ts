
import { 
  MetricData, 
  PerformanceMetric, 
  SalesData, 
  TrafficData,
  NotificationData 
} from '@/types/dashboard';

/**
 * Mock data for testing dashboard components
 */
export const mockMetrics: MetricData[] = [
  {
    timestamp: '10:00',
    value: 1250,
    label: 'Revenue',
    category: 'revenue'
  },
  {
    timestamp: '11:00', 
    value: 1350,
    label: 'Revenue',
    category: 'revenue'
  }
];

export const mockPerformanceMetrics: PerformanceMetric[] = [
  {
    id: 'revenue-1',
    title: 'Total Revenue',
    value: 45678,
    unit: '$',
    change: 12.5,
    trend: 'up' as const,
    category: 'revenue' as const,
    priority: 'high' as const
  },
  {
    id: 'users-1',
    title: 'Active Users',
    value: 2847,
    unit: '',
    change: -2.3,
    trend: 'down' as const,
    category: 'users' as const,
    priority: 'medium' as const
  }
];

export const mockSalesData: SalesData[] = [
  { 
    month: 'Jan', 
    revenue: 4000, 
    orders: 240, 
    customers: 180, 
    profit: 1200, 
    expenses: 2800, 
    target: 4500 
  },
  { 
    month: 'Feb', 
    revenue: 3000, 
    orders: 198, 
    customers: 165, 
    profit: 900, 
    expenses: 2100, 
    target: 3500 
  },
  { 
    month: 'Mar', 
    revenue: 2000, 
    orders: 156, 
    customers: 142, 
    profit: 600, 
    expenses: 1400, 
    target: 2500 
  }
];

export const mockTrafficData: TrafficData[] = [
  { name: 'Organic Search', value: 4000, color: '#8884d8', sessions: 12500, growth: 15.2 },
  { name: 'Direct', value: 3000, color: '#82ca9d', sessions: 8900, growth: 8.7 }
];

export const mockNotifications: NotificationData[] = [
  {
    id: '1',
    type: 'success',
    title: 'Test Notification',
    message: 'This is a test notification',
    timestamp: new Date(),
    isRead: false
  }
];
