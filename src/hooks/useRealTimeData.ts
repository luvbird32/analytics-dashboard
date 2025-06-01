
import { useState, useEffect, useCallback } from 'react';
import { MetricData, SalesData, TrafficData, PerformanceMetric } from '@/types/dashboard';

/**
 * Custom hook for managing real-time dashboard data
 * Simulates real-time updates with randomized data
 */
export const useRealTimeData = () => {
  const [isLive, setIsLive] = useState(false);
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);

  // Generate initial data
  const generateInitialData = useCallback(() => {
    // Performance metrics
    setPerformanceMetrics([
      {
        id: 'revenue',
        title: 'Total Revenue',
        value: 45231,
        change: 12.5,
        trend: 'up',
        unit: '$'
      },
      {
        id: 'users',
        title: 'Active Users',
        value: 2543,
        change: -3.2,
        trend: 'down',
        unit: ''
      },
      {
        id: 'conversion',
        title: 'Conversion Rate',
        value: 3.24,
        change: 0.8,
        trend: 'up',
        unit: '%'
      },
      {
        id: 'bounce',
        title: 'Bounce Rate',
        value: 42.1,
        change: -1.5,
        trend: 'down',
        unit: '%'
      }
    ]);

    // Sales data for the last 6 months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    setSalesData(months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 50000) + 20000,
      orders: Math.floor(Math.random() * 500) + 200,
      customers: Math.floor(Math.random() * 300) + 150
    })));

    // Traffic sources
    setTrafficData([
      { name: 'Organic Search', value: 45, color: '#0088FE' },
      { name: 'Direct', value: 25, color: '#00C49F' },
      { name: 'Social Media', value: 20, color: '#FFBB28' },
      { name: 'Email', value: 10, color: '#FF8042' }
    ]);

    // Real-time metrics (last 10 data points)
    const now = new Date();
    const initialMetrics = Array.from({ length: 10 }, (_, i) => ({
      timestamp: new Date(now.getTime() - (9 - i) * 60000).toLocaleTimeString(),
      value: Math.floor(Math.random() * 100) + 50,
      label: `Point ${i + 1}`
    }));
    setMetrics(initialMetrics);
  }, []);

  // Update real-time data
  const updateRealTimeData = useCallback(() => {
    if (!isLive) return;

    setMetrics(prev => {
      const newMetric: MetricData = {
        timestamp: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * 100) + 50,
        label: `Live ${prev.length + 1}`
      };
      return [...prev.slice(-9), newMetric];
    });

    // Occasionally update performance metrics
    if (Math.random() > 0.8) {
      setPerformanceMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * metric.value * 0.1,
        change: (Math.random() - 0.5) * 10
      })));
    }
  }, [isLive]);

  useEffect(() => {
    generateInitialData();
  }, [generateInitialData]);

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(updateRealTimeData, 2000);
    return () => clearInterval(interval);
  }, [isLive, updateRealTimeData]);

  const toggleLiveData = () => setIsLive(!isLive);

  return {
    isLive,
    metrics,
    salesData,
    trafficData,
    performanceMetrics,
    toggleLiveData,
    refreshData: generateInitialData
  };
};
