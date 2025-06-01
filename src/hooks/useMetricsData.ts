
import { useState, useCallback } from 'react';
import { MetricData, PerformanceMetric } from '@/types/dashboard';
import { DataGeneratorService } from '@/services/dataGenerator';
import { NotificationService } from '@/services/notificationService';

/**
 * Hook for managing core metrics data
 */
export const useMetricsData = () => {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);

  /**
   * Generates initial metrics data
   */
  const generateInitialMetrics = useCallback(() => {
    console.log('🚀 Generating core metrics data...');
    setMetrics(DataGeneratorService.generateInitialMetrics());
    setPerformanceMetrics(DataGeneratorService.generatePerformanceMetrics());
  }, []);

  /**
   * Updates metrics with real-time data
   */
  const updateMetrics = useCallback((isLive: boolean, onNotification: (notification: any) => void) => {
    if (!isLive) return;

    // Update metrics
    setMetrics(prev => {
      const newMetric = DataGeneratorService.generateNewMetric(prev.length);
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
