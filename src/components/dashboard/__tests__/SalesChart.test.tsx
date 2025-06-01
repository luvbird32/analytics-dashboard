
import { render, screen } from '@/test/utils/testUtils';
import { SalesChart } from '../SalesChart';
import { mockSalesData } from '@/test/mocks/mockData';

describe('SalesChart', () => {
  it('renders chart title', () => {
    render(<SalesChart data={mockSalesData} />);
    
    expect(screen.getByText('Sales Overview')).toBeInTheDocument();
  });

  it('renders with provided data', () => {
    render(<SalesChart data={mockSalesData} />);
    
    // Check if chart container is rendered
    const chartContainer = document.querySelector('.recharts-wrapper');
    expect(chartContainer).toBeInTheDocument();
  });

  it('handles empty data gracefully', () => {
    render(<SalesChart data={[]} />);
    
    expect(screen.getByText('Sales Overview')).toBeInTheDocument();
  });
});
