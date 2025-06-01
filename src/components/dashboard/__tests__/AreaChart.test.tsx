
import { render, screen } from '@/test/utils/testUtils';
import { AreaChart } from '../AreaChart';

const mockAreaData = [
  { name: 'Jan', desktop: 4000, mobile: 2400, tablet: 1000, total: 7400 },
  { name: 'Feb', desktop: 3000, mobile: 1398, tablet: 800, total: 5198 }
];

describe('AreaChart', () => {
  it('renders chart title', () => {
    render(<AreaChart data={mockAreaData} />);
    
    expect(screen.getByText('Device Usage Trends')).toBeInTheDocument();
  });

  it('renders with provided data', () => {
    render(<AreaChart data={mockAreaData} />);
    
    const chartContainer = document.querySelector('.recharts-wrapper');
    expect(chartContainer).toBeInTheDocument();
  });

  it('handles empty data gracefully', () => {
    render(<AreaChart data={[]} />);
    
    expect(screen.getByText('Device Usage Trends')).toBeInTheDocument();
  });
});
