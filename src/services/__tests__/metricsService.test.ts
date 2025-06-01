
import { MetricsService } from '../core/metricsService';

describe('MetricsService', () => {
  it('generates new metric with correct structure', () => {
    const metric = MetricsService.generateNewMetric();
    
    expect(metric).toHaveProperty('timestamp');
    expect(metric).toHaveProperty('value');
    expect(metric).toHaveProperty('label');
    expect(metric).toHaveProperty('category');
  });

  it('generates metric with incremental index', () => {
    const metric1 = MetricsService.generateNewMetric();
    const metric2 = MetricsService.generateNewMetric();
    
    expect(metric1.label).not.toBe(metric2.label);
  });
});
