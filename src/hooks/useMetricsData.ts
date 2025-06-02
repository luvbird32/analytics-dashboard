
import { useState, useCallback } from 'react';
import { MetricData, PerformanceMetric } from '@/types/dashboard';
import { mockMetrics, mockPerformanceMetrics } from '@/test/mocks/mockData';
import { NotificationService } from '@/services/notificationService';

/**
 * Hook for managing core metrics data using mock data
 */
export const useMetricsData = () => {
  const [metrics, setMetrics] = useState<MetricData[]>(mockMetrics);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>(mockPerformanceMetrics);

  console.log('🔍 useMetricsData - Current State:', {
    metricsLength: metrics.length,
    performanceMetricsLength: performanceMetrics.length,
    metricsData: metrics,
    performanceMetricsData: performanceMetrics
  });

  /**
   * Generates initial metrics data using mock data
   */
  const generateInitialMetrics = useCallback(() => {
    console.log('🚀 Loading mock metrics data...');
    console.log('📊 Mock metrics:', mockMetrics);
    console.log('⚡ Mock performance metrics:', mockPerformanceMetrics);
    
    // Ensure we're setting the mock data
    setMetrics([...mockMetrics]);
    setPerformanceMetrics([...mockPerformanceMetrics]);
    
    console.log('✅ Mock metrics data loaded successfully');
  }, []);

  /**
   * Updates metrics with real-time data
   */
  const updateMetrics = useCallback((isLive: boolean, onNotification: (notification: any) => void) => {
    if (!isLive) return;

    // Update metrics with new mock-based data
    setMetrics(prev => {
      const newMetric: MetricData = {
        timestamp: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * 150) + 50,
        label: `Live ${prev.length + 1}`,
        category: ['revenue', 'users', 'conversion'][Math.floor(Math.random() * 3)]
      };
      return [...prev.slice(-19), newMetric];
    });

    // Update performance metrics with notifications
    if (Math.random() > 0.7) {
      setPerformanceMetrics(prev => prev.map(metric => {
        const change = (Math.random() - 0.5) * 5;
        const newValue = Math.max(0, metric.value + change);
        
        // Generate notification for significant changes
        if (Math.abs(change) > 2) {
          const notification = NotificationService.createMetricChangeNotification(metric, change);
          onNotification(notification);
        }

        return {
          ...metric,
          value: newValue,
          change: change,
          trend: change > 0 ? 'up' as const : change < 0 ? 'down' as const : 'stable' as const
        };
      }));
    }
  }, []);

  return {
    metrics,
    performanceMetrics,
    generateInitialMetrics,
    updateMetrics
  };
};
