
import { MetricsService } from '../core/metricsService';

describe('MetricsService', () => {
  describe('generateMetrics', () => {
    it('generates metrics array with correct count', () => {
      const data = MetricsService.generateMetrics(10);
      
      expect(data).toHaveLength(10);
      expect(data[0]).toHaveProperty('timestamp');
      expect(data[0]).toHaveProperty('value');
      expect(data[0]).toHaveProperty('label');
      expect(data[0]).toHaveProperty('category');
    });

    it('generates valid metric values', () => {
      const data = MetricsService.generateMetrics(5);
      
      data.forEach(metric => {
        expect(typeof metric.value).toBe('number');
        expect(metric.value).toBeGreaterThan(0);
        expect(typeof metric.label).toBe('string');
        expect(metric.label.length).toBeGreaterThan(0);
      });
    });
  });

  describe('generatePerformanceMetrics', () => {
    it('generates performance metrics with required properties', () => {
      const data = MetricsService.generatePerformanceMetrics();
      
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      
      data.forEach(metric => {
        expect(metric).toHaveProperty('id');
        expect(metric).toHaveProperty('title');
        expect(metric).toHaveProperty('value');
        expect(metric).toHaveProperty('unit');
        expect(metric).toHaveProperty('change');
        expect(metric).toHaveProperty('trend');
        expect(metric).toHaveProperty('category');
        expect(metric).toHaveProperty('priority');
      });
    });
  });

  describe('generateSalesData', () => {
    it('generates sales data with all required fields', () => {
      const data = MetricsService.generateSalesData();
      
      expect(Array.isArray(data)).toBe(true);
      
      data.forEach(sale => {
        expect(sale).toHaveProperty('month');
        expect(sale).toHaveProperty('revenue');
        expect(sale).toHaveProperty('orders');
        expect(sale).toHaveProperty('customers');
        expect(sale).toHaveProperty('profit');
        expect(sale).toHaveProperty('expenses');
        expect(sale).toHaveProperty('target');
      });
    });
  });
});
