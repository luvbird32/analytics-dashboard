
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
    timestamp: '09:00',
    value: 1250,
    label: 'Revenue',
    category: 'revenue'
  },
  {
    timestamp: '09:15', 
    value: 1350,
    label: 'Revenue',
    category: 'revenue'
  },
  {
    timestamp: '09:30',
    value: 1180,
    label: 'Users',
    category: 'users'
  },
  {
    timestamp: '09:45',
    value: 1420,
    label: 'Revenue',
    category: 'revenue'
  },
  {
    timestamp: '10:00',
    value: 1380,
    label: 'Engagement',
    category: 'engagement'
  },
  {
    timestamp: '10:15',
    value: 1550,
    label: 'Revenue',
    category: 'revenue'
  },
  {
    timestamp: '10:30',
    value: 1200,
    label: 'Users',
    category: 'users'
  },
  {
    timestamp: '10:45',
    value: 1680,
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
    priority: 'high' as const,
    target: 50000
  },
  {
    id: 'users-1',
    title: 'Active Users',
    value: 2847,
    unit: '',
    change: -2.3,
    trend: 'down' as const,
    category: 'users' as const,
    priority: 'medium' as const,
    target: 3000
  },
  {
    id: 'orders-1',
    title: 'Monthly Orders',
    value: 1284,
    unit: '',
    change: 8.7,
    trend: 'up' as const,
    category: 'revenue' as const,
    priority: 'high' as const,
    target: 1500
  },
  {
    id: 'conversion-1',
    title: 'Conversion Rate',
    value: 3.24,
    unit: '%',
    change: 0.5,
    trend: 'up' as const,
    category: 'engagement' as const,
    priority: 'medium' as const,
    target: 4.0
  },
  {
    id: 'bounce-1',
    title: 'Bounce Rate',
    value: 42.1,
    unit: '%',
    change: -1.8,
    trend: 'up' as const,
    category: 'engagement' as const,
    priority: 'low' as const,
    target: 35.0
  },
  {
    id: 'sessions-1',
    title: 'Avg Session Duration',
    value: 4.23,
    unit: 'min',
    change: 15.2,
    trend: 'up' as const,
    category: 'engagement' as const,
    priority: 'medium' as const,
    target: 5.0
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
  },
  { 
    month: 'Apr', 
    revenue: 2780, 
    orders: 208, 
    customers: 167, 
    profit: 834, 
    expenses: 1946, 
    target: 3200 
  },
  { 
    month: 'May', 
    revenue: 1890, 
    orders: 134, 
    customers: 121, 
    profit: 567, 
    expenses: 1323, 
    target: 2100 
  },
  { 
    month: 'Jun', 
    revenue: 2390, 
    orders: 167, 
    customers: 143, 
    profit: 717, 
    expenses: 1673, 
    target: 2800 
  }
];

export const mockTrafficData: TrafficData[] = [
  { name: 'Organic Search', value: 4000, color: '#8884d8', sessions: 12500, growth: 15.2 },
  { name: 'Direct', value: 3000, color: '#82ca9d', sessions: 8900, growth: 8.7 },
  { name: 'Social Media', value: 2000, color: '#ffc658', sessions: 5600, growth: 22.1 },
  { name: 'Paid Ads', value: 2780, color: '#ff7300', sessions: 7800, growth: -3.4 },
  { name: 'Email', value: 1890, color: '#00ff88', sessions: 4200, growth: 12.8 },
  { name: 'Referral', value: 2390, color: '#ff0088', sessions: 3100, growth: 6.9 }
];

export const mockNotifications: NotificationData[] = [
  {
    id: '1',
    type: 'success',
    title: 'Revenue Target Achieved',
    message: 'Monthly revenue target of $45K has been reached!',
    timestamp: new Date(),
    isRead: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'User Engagement Drop',
    message: 'Active users decreased by 2.3% this month',
    timestamp: new Date(Date.now() - 3600000),
    isRead: false
  },
  {
    id: '3',
    type: 'info',
    title: 'New Feature Launch',
    message: 'Advanced analytics dashboard is now live',
    timestamp: new Date(Date.now() - 7200000),
    isRead: true
  }
];
