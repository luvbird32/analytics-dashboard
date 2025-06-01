
import { render } from '@/test/utils/testUtils';
import { MetricCard } from '@/components/dashboard/MetricCard';

describe('MetricCard Visual Tests', () => {
  it('renders with different states', () => {
    const metrics = [
      { title: 'Revenue', value: '$12,345', change: '+12%', trend: 'up' as const },
      { title: 'Users', value: '1,234', change: '-5%', trend: 'down' as const },
      { title: 'Orders', value: '567', change: '0%', trend: 'stable' as const }
    ];

    metrics.forEach((metric, index) => {
      const { container } = render(<MetricCard {...metric} />);
      expect(container.firstChild).toMatchSnapshot(`metric-card-${index}`);
    });
  });

  it('handles long text gracefully', () => {
    const { container } = render(
      <MetricCard 
        title="Very Long Title That Should Wrap Properly"
        value="$999,999,999.99"
        change="+999.99%"
        trend="up"
      />
    );
    expect(container.firstChild).toMatchSnapshot('metric-card-long-text');
  });
});
