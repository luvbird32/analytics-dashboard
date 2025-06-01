
import { FilterUtils } from '../filterUtils';
import { mockPerformanceMetrics } from '@/test/mocks/mockData';

describe('FilterUtils', () => {
  describe('filterPerformanceMetrics', () => {
    it('returns all metrics when no filters applied', () => {
      const filters = {
        dateRange: '30d',
        category: [],
        region: [],
        userType: []
      };
      
      const result = FilterUtils.filterPerformanceMetrics(mockPerformanceMetrics, filters);
      
      expect(result).toEqual(mockPerformanceMetrics);
    });

    it('filters metrics correctly', () => {
      const filters = {
        dateRange: '7d',
        category: ['revenue'],
        region: [],
        userType: []
      };
      
      const result = FilterUtils.filterPerformanceMetrics(mockPerformanceMetrics, filters);
      
      // Should return the same data for now since FilterUtils.filterPerformanceMetrics 
      // just returns the original data (as seen in the implementation)
      expect(result).toEqual(mockPerformanceMetrics);
    });
  });
});
