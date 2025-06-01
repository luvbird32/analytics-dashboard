
import { render, screen } from '@/test/utils/testUtils';
import { BarChart } from '../BarChart';

const mockBarData = [
  { name: 'Sales', value: 100, target: 120 },
  { name: 'Marketing', value: 80, target: 90 }
];

describe('BarChart', () => {
  it('renders chart title', () => {
    render(<BarChart data={mockBarData} />);
    
    expect(screen.getByText('Performance vs Target')).toBeInTheDocument();
  });

  it('renders with provided data', () => {
    render(<BarChart data={mockBarData} />);
    
    const chartContainer = document.querySelector('.recharts-wrapper');
    expect(chartContainer).toBeInTheDocument();
  });
});
