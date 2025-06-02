
/**
 * Filter utilities for dashboard data management
 */

import { DashboardFilters } from '@/types/dashboard';

export class FilterUtils {
  /**
   * Apply filters to data array
   */
  static applyFilters<T>(data: T[], filters: DashboardFilters): T[] {
    // Basic filter implementation - can be extended
    return data;
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
      dateRange: { start: null, end: null },
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
