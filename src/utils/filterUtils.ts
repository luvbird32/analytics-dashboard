
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
    let filteredMetrics = metrics;

    // Filter by category if specified
    if (filters.category.length > 0) {
      filteredMetrics = filteredMetrics.filter(metric => 
        filters.category.includes(metric.category)
      );
    }

    // Additional filtering logic can be added here for region, userType, etc.
    
    return filteredMetrics;
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
