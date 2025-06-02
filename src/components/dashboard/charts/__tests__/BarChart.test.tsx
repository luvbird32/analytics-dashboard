
import { render, screen } from '@/test/utils/testUtils';
import { CustomBarChart } from '../BarChart';

const mockBarData = [
  { name: 'Sales', value: 100, target: 120, category: 'Revenue' },
  { name: 'Marketing', value: 80, target: 90, category: 'Growth' }
];

describe('CustomBarChart', () => {
  it('renders chart title', () => {
    render(<CustomBarChart data={mockBarData} />);
    
    expect(screen.getByText('Performance vs Target')).toBeInTheDocument();
  });

  it('renders with provided data', () => {
    render(<CustomBarChart data={mockBarData} />);
    
    const chartContainer = document.querySelector('.recharts-wrapper');
    expect(chartContainer).toBeInTheDocument();
  });
});
