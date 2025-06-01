import { useState, useEffect, useCallback } from 'react';
import { 
  MetricData, 
  SalesData, 
  TrafficData, 
  PerformanceMetric, 
  HeatmapData, 
  RadarData, 
  AreaData,
  NotificationData,
  DashboardFilters
} from '@/types/dashboard';
import { DataGeneratorService } from '@/services/dataGenerator';
import { NotificationService } from '@/services/notificationService';
import { FilterUtils } from '@/utils/filterUtils';

/**
 * Real-time dashboard data management hook
 * Orchestrates data generation, updates, and filtering
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
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: '30d',
    category: [],
    region: [],
    userType: []
  });

  /**
   * Generates comprehensive initial data using services
   */
  const generateInitialData = useCallback(() => {
    console.log('🚀 Generating comprehensive dashboard data...');
    
    setPerformanceMetrics(DataGeneratorService.generatePerformanceMetrics());
    setSalesData(DataGeneratorService.generateSalesData());
    setTrafficData(DataGeneratorService.generateTrafficData());
    setRadarData(DataGeneratorService.generateRadarData());
    setAreaData(DataGeneratorService.generateAreaData());
    setMetrics(DataGeneratorService.generateInitialMetrics());

    // Generate heatmap data (keeping this here as it's more complex)
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

    console.log('✅ Comprehensive dashboard data generated successfully');
  }, []);

  /**
   * Updates real-time data with notifications
   */
  const updateRealTimeData = useCallback(() => {
    if (!isLive) return;

    console.log('📊 Updating real-time data...');

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
          setNotifications(prevNotifications => 
            NotificationService.addNotification(prevNotifications, notification)
          );
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

  /**
   * Handles data export with notification
   */
  const handleExport = (format: 'pdf' | 'excel' | 'csv' | 'png') => {
    console.log(`📤 Exporting dashboard data as ${format.toUpperCase()}...`);
    
    const notification = NotificationService.createExportNotification(format);
    setNotifications(prev => NotificationService.addNotification(prev, notification));
  };

  /**
   * Clears all notifications
   */
  const clearNotifications = () => {
    setNotifications([]);
  };

  /**
   * Marks a notification as read
   */
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => NotificationService.markAsRead(prev, id));
  };

  /**
   * Toggles live data updates
   */
  const toggleLiveData = () => {
    console.log(`🔄 Live data ${!isLive ? 'started' : 'stopped'}`);
    setIsLive(!isLive);
  };

  // Initialize data on mount
  useEffect(() => {
    generateInitialData();
  }, [generateInitialData]);

  // Set up real-time updates
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(updateRealTimeData, 1500);
    return () => clearInterval(interval);
  }, [isLive, updateRealTimeData]);

  return {
    isLive,
    metrics,
    salesData,
    trafficData,
    performanceMetrics: FilterUtils.filterPerformanceMetrics(performanceMetrics, filters),
    heatmapData,
    radarData,
    areaData,
    notifications,
    filters,
    toggleLiveData,
    refreshData: generateInitialData,
    clearNotifications,
    markNotificationAsRead,
    setFilters,
    handleExport
  };
};
