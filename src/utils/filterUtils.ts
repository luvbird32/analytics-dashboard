
import { DashboardFilters, PerformanceMetric } from '@/types/dashboard';

/**
 * Filter utility functions for dashboard data
 * Provides filtering logic for various data types
 */
export class FilterUtils {
  /**
   * Filters performance metrics based on current filters
   */
  static filterPerformanceMetrics(
    metrics: PerformanceMetric[], 
    filters: DashboardFilters
  ): PerformanceMetric[] {
    if (filters.category.length === 0) return metrics;
    return metrics.filter(metric => filters.category.includes(metric.category));
  }

  /**
   * Counts active filters across all filter types
   */
  static getActiveFilterCount(filters: DashboardFilters): number {
    return filters.category.length + filters.region.length + filters.userType.length;
  }

  /**
   * Resets all filters to default state
   */
  static clearAllFilters(): DashboardFilters {
    return {
      dateRange: '30d',
      category: [],
      region: [],
      userType: []
    };
  }

  /**
   * Toggles a filter value in an array
   */
  static toggleFilterValue(currentValues: string[], value: string): string[] {
    return currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
  }
}
