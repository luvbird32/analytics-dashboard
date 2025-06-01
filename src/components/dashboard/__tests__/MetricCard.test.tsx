
import { render, screen } from '@/test/utils/testUtils';
import { MetricCard } from '../MetricCard';
import { mockPerformanceMetrics } from '@/test/mocks/mockData';

describe('MetricCard', () => {
  const mockMetric = mockPerformanceMetrics[0];

  it('renders metric data correctly', () => {
    render(<MetricCard metric={mockMetric} />);
    
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$45,678')).toBeInTheDocument();
    expect(screen.getByText('+12.5% from last month')).toBeInTheDocument();
  });

  it('displays correct trend icon for upward trend', () => {
    render(<MetricCard metric={mockMetric} />);
    
    const trendIcon = screen.getByTestId('trend-icon') || document.querySelector('.text-green-500');
    expect(trendIcon).toBeInTheDocument();
  });

  it('displays negative change correctly', () => {
    const negativeMetric = mockPerformanceMetrics[1];
    render(<MetricCard metric={negativeMetric} />);
    
    expect(screen.getByText('-2.3% from last month')).toBeInTheDocument();
  });

  it('formats numbers with commas', () => {
    render(<MetricCard metric={mockMetric} />);
    
    expect(screen.getByText('$45,678')).toBeInTheDocument();
  });
});
