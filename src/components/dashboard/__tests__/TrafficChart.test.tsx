
import { render, screen } from '@/test/utils/testUtils';
import { TrafficChart } from '../TrafficChart';
import { mockTrafficData } from '@/test/mocks/mockData';

describe('TrafficChart', () => {
  it('renders chart title', () => {
    render(<TrafficChart data={mockTrafficData} />);
    
    expect(screen.getByText('Traffic Sources')).toBeInTheDocument();
  });

  it('renders with provided data', () => {
    render(<TrafficChart data={mockTrafficData} />);
    
    const chartContainer = document.querySelector('.recharts-wrapper');
    expect(chartContainer).toBeInTheDocument();
  });

  it('handles empty data gracefully', () => {
    render(<TrafficChart data={[]} />);
    
    expect(screen.getByText('Traffic Sources')).toBeInTheDocument();
  });

  it('displays traffic source names', () => {
    render(<TrafficChart data={mockTrafficData} />);
    
    expect(screen.getByText('Organic Search')).toBeInTheDocument();
    expect(screen.getByText('Direct')).toBeInTheDocument();
  });
});
