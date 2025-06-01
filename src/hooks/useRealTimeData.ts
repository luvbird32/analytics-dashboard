
import { useState, useEffect, useCallback } from 'react';
import { 
  MetricData, 
  SalesData, 
  TrafficData, 
  PerformanceMetric, 
  HeatmapData, 
  RadarData, 
  AreaData,
  NotificationData 
} from '@/types/dashboard';

/**
 * Advanced real-time dashboard data management
 * Simulates enterprise-level analytics with complex data structures
 */
export const useRealTimeData = () => {
  const [isLive, setIsLive] = useState(false);
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [radarData, setRadarData] = useState<RadarData[]>([]);
  const [areaData, setAreaData] = useState<AreaData[]>([]);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  // Generate comprehensive initial data
  const generateInitialData = useCallback(() => {
    console.log('🚀 Generating comprehensive dashboard data...');
    
    // Enhanced performance metrics with targets and priorities
    setPerformanceMetrics([
      {
        id: 'revenue',
        title: 'Total Revenue',
        value: 245231,
        change: 15.2,
        trend: 'up',
        unit: '$',
        target: 300000,
        category: 'revenue',
        priority: 'high'
      },
      {
        id: 'users',
        title: 'Active Users',
        value: 12543,
        change: -2.1,
        trend: 'down',
        unit: '',
        target: 15000,
        category: 'users',
        priority: 'high'
      },
      {
        id: 'conversion',
        title: 'Conversion Rate',
        value: 4.67,
        change: 1.3,
        trend: 'up',
        unit: '%',
        target: 5.0,
        category: 'conversion',
        priority: 'medium'
      },
      {
        id: 'bounce',
        title: 'Bounce Rate',
        value: 38.2,
        change: -3.5,
        trend: 'down',
        unit: '%',
        target: 35.0,
        category: 'performance',
        priority: 'medium'
      },
      {
        id: 'loadTime',
        title: 'Avg Load Time',
        value: 1.34,
        change: -0.15,
        trend: 'down',
        unit: 's',
        target: 1.0,
        category: 'performance',
        priority: 'high'
      },
      {
        id: 'satisfaction',
        title: 'User Satisfaction',
        value: 4.8,
        change: 0.2,
        trend: 'up',
        unit: '/5',
        target: 4.5,
        category: 'users',
        priority: 'medium'
      }
    ]);

    // Enhanced sales data with profit and targets
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    setSalesData(months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 80000) + 40000,
      orders: Math.floor(Math.random() * 800) + 400,
      customers: Math.floor(Math.random() * 500) + 250,
      profit: Math.floor(Math.random() * 25000) + 15000,
      expenses: Math.floor(Math.random() * 20000) + 10000,
      target: Math.floor(Math.random() * 70000) + 50000
    })));

    // Enhanced traffic sources with growth metrics
    setTrafficData([
      { name: 'Organic Search', value: 45, color: '#0088FE', growth: 12.5, sessions: 15420 },
      { name: 'Direct Traffic', value: 25, color: '#00C49F', growth: -2.3, sessions: 8560 },
      { name: 'Social Media', value: 20, color: '#FFBB28', growth: 8.7, sessions: 6840 },
      { name: 'Email Marketing', value: 10, color: '#FF8042', growth: 15.2, sessions: 3420 }
    ]);

    // Generate heatmap data for user activity
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const heatmapPoints: HeatmapData[] = [];
    days.forEach(day => {
      for (let hour = 0; hour < 24; hour++) {
        const baseValue = Math.sin((hour - 12) / 24 * Math.PI * 2) * 50 + 50;
        const weekendMultiplier = ['Sat', 'Sun'].includes(day) ? 0.7 : 1;
        const value = Math.max(0, baseValue * weekendMultiplier + (Math.random() - 0.5) * 20);
        heatmapPoints.push({
          day,
          hour,
          value: Math.round(value),
          intensity: value / 100
        });
      }
    });
    setHeatmapData(heatmapPoints);

    // Radar chart data for performance metrics
    setRadarData([
      { metric: 'Performance', current: 85, previous: 80, fullMark: 100 },
      { metric: 'Security', current: 92, previous: 88, fullMark: 100 },
      { metric: 'Usability', current: 78, previous: 75, fullMark: 100 },
      { metric: 'Accessibility', current: 88, previous: 82, fullMark: 100 },
      { metric: 'SEO', current: 94, previous: 90, fullMark: 100 },
      { metric: 'Mobile', current: 87, previous: 85, fullMark: 100 }
    ]);

    // Area chart data for device usage
    const areaMonths = months.slice(0, 8);
    setAreaData(areaMonths.map(month => ({
      name: month,
      desktop: Math.floor(Math.random() * 3000) + 2000,
      mobile: Math.floor(Math.random() * 4000) + 3000,
      tablet: Math.floor(Math.random() * 1000) + 500,
      total: 0
    })).map(item => ({
      ...item,
      total: item.desktop + item.mobile + item.tablet
    })));

    // Real-time metrics with categories
    const now = new Date();
    const initialMetrics = Array.from({ length: 20 }, (_, i) => ({
      timestamp: new Date(now.getTime() - (19 - i) * 60000).toLocaleTimeString(),
      value: Math.floor(Math.random() * 150) + 50,
      label: `Point ${i + 1}`,
      category: ['sales', 'traffic', 'engagement'][Math.floor(Math.random() * 3)]
    }));
    setMetrics(initialMetrics);

    console.log('✅ Comprehensive dashboard data generated successfully');
  }, []);

  // Enhanced real-time updates with notifications
  const updateRealTimeData = useCallback(() => {
    if (!isLive) return;

    console.log('📊 Updating real-time data...');

    setMetrics(prev => {
      const newMetric: MetricData = {
        timestamp: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * 150) + 50,
        label: `Live ${prev.length + 1}`,
        category: ['sales', 'traffic', 'engagement'][Math.floor(Math.random() * 3)]
      };
      return [...prev.slice(-19), newMetric];
    });

    // Randomly update performance metrics with notifications
    if (Math.random() > 0.7) {
      setPerformanceMetrics(prev => prev.map(metric => {
        const change = (Math.random() - 0.5) * 5;
        const newValue = Math.max(0, metric.value + change);
        
        // Generate notification for significant changes
        if (Math.abs(change) > 2) {
          const notification: NotificationData = {
            id: `notif-${Date.now()}-${Math.random()}`,
            type: change > 0 ? 'success' : 'warning',
            title: `${metric.title} ${change > 0 ? 'Increased' : 'Decreased'}`,
            message: `${metric.title} ${change > 0 ? 'rose' : 'fell'} by ${Math.abs(change).toFixed(1)}${metric.unit}`,
            timestamp: new Date(),
            isRead: false
          };
          
          setNotifications(prev => [notification, ...prev.slice(0, 9)]);
        }

        return {
          ...metric,
          value: newValue,
          change: change,
          trend: change > 0 ? 'up' as const : change < 0 ? 'down' as const : 'stable' as const
        };
      }));
    }

    // Update traffic data occasionally
    if (Math.random() > 0.8) {
      setTrafficData(prev => prev.map(source => ({
        ...source,
        sessions: source.sessions + Math.floor((Math.random() - 0.5) * 100),
        growth: source.growth + (Math.random() - 0.5) * 2
      })));
    }
  }, [isLive]);

  useEffect(() => {
    generateInitialData();
  }, [generateInitialData]);

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(updateRealTimeData, 1500);
    return () => clearInterval(interval);
  }, [isLive, updateRealTimeData]);

  const toggleLiveData = () => {
    console.log(`🔄 Live data ${!isLive ? 'started' : 'stopped'}`);
    setIsLive(!isLive);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  return {
    isLive,
    metrics,
    salesData,
    trafficData,
    performanceMetrics,
    heatmapData,
    radarData,
    areaData,
    notifications,
    toggleLiveData,
    refreshData: generateInitialData,
    clearNotifications,
    markNotificationAsRead
  };
};
