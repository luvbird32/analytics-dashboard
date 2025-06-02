
/**
 * Filter utilities for dashboard data management
 */

import { DashboardFilters, PerformanceMetric } from '@/types/dashboard';

export class FilterUtils {
  /**
   * Apply filters to data array
   */
  static applyFilters<T>(data: T[], filters: DashboardFilters): T[] {
    // Basic filter implementation - can be extended
    return data;
  }

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
   * Toggles a filter value in an array
   */
  static toggleFilterValue(currentValues: string[], value: string): string[] {
    return currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
  }

  /**
   * Get count of active filters
   */
  static getActiveFilterCount(filters: DashboardFilters): number {
    return (filters.category?.length || 0) + 
           (filters.region?.length || 0) + 
           (filters.userType?.length || 0);
  }

  /**
   * Clear all filters
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
   * Check if any filters are active
   */
  static hasActiveFilters(filters: DashboardFilters): boolean {
    return this.getActiveFilterCount(filters) > 0;
  }
}
