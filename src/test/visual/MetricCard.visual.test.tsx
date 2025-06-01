
import { render } from '@/test/utils/testUtils';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { mockPerformanceMetrics } from '@/test/mocks/mockData';

describe('MetricCard Visual Tests', () => {
  it('renders with different states', () => {
    mockPerformanceMetrics.forEach((metric, index) => {
      const { container } = render(<MetricCard metric={metric} />);
      expect(container.firstChild).toMatchSnapshot(`metric-card-${index}`);
    });
  });

  it('handles long text gracefully', () => {
    const longTextMetric = {
      ...mockPerformanceMetrics[0],
      title: "Very Long Title That Should Wrap Properly",
      value: 999999999.99,
      change: 999.99
    };
    
    const { container } = render(<MetricCard metric={longTextMetric} />);
    expect(container.firstChild).toMatchSnapshot('metric-card-long-text');
  });
});
