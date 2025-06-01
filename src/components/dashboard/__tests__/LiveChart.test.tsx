
import { render, screen } from '@/test/utils/testUtils';
import { LiveChart } from '../LiveChart';
import { mockMetrics } from '@/test/mocks/mockData';

describe('LiveChart', () => {
  it('renders chart title', () => {
    render(<LiveChart data={mockMetrics} isLive={false} />);
    
    expect(screen.getByText('Real-time Metrics')).toBeInTheDocument();
  });

  it('shows live indicator when isLive is true', () => {
    render(<LiveChart data={mockMetrics} isLive={true} />);
    
    expect(screen.getByText('Live')).toBeInTheDocument();
    const indicator = document.querySelector('.animate-pulse');
    expect(indicator).toBeInTheDocument();
  });

  it('does not show live indicator when isLive is false', () => {
    render(<LiveChart data={mockMetrics} isLive={false} />);
    
    expect(screen.queryByText('Live')).not.toBeInTheDocument();
  });

  it('renders chart with data', () => {
    render(<LiveChart data={mockMetrics} isLive={false} />);
    
    const chartContainer = document.querySelector('.recharts-wrapper');
    expect(chartContainer).toBeInTheDocument();
  });
});
