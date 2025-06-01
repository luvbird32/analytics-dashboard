
import { render } from '@/test/utils/testUtils';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { TrafficChart } from '@/components/dashboard/TrafficChart';
import { mockSalesData, mockTrafficData } from '@/test/mocks/mockData';

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
