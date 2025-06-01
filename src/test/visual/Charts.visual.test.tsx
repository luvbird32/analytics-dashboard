
import { render } from '@/test/utils/testUtils';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { TrafficChart } from '@/components/dashboard/TrafficChart';

const mockSalesData = [
  { month: 'Jan', sales: 4000, target: 3800 },
  { month: 'Feb', sales: 3000, target: 3200 }
];

const mockTrafficData = [
  { source: 'Direct', sessions: 1234, growth: 12.5 },
  { source: 'Social', sessions: 987, growth: -5.2 }
];

describe('Charts Visual Tests', () => {
  it('renders SalesChart consistently', () => {
    const { container } = render(<SalesChart data={mockSalesData} />);
    expect(container.firstChild).toMatchSnapshot('sales-chart');
  });

  it('renders TrafficChart consistently', () => {
    const { container } = render(<TrafficChart data={mockTrafficData} />);
    expect(container.firstChild).toMatchSnapshot('traffic-chart');
  });

  it('renders charts with empty data', () => {
    const { container: salesContainer } = render(<SalesChart data={[]} />);
    const { container: trafficContainer } = render(<TrafficChart data={[]} />);
    
    expect(salesContainer.firstChild).toMatchSnapshot('sales-chart-empty');
    expect(trafficContainer.firstChild).toMatchSnapshot('traffic-chart-empty');
  });
});
