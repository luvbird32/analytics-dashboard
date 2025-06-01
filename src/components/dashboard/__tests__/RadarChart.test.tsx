
import { render, screen } from '@/test/utils/testUtils';
import { RadarChart } from '../RadarChart';

const mockRadarData = [
  { metric: 'Performance', current: 80, previous: 70, fullMark: 100 },
  { metric: 'Security', current: 90, previous: 85, fullMark: 100 }
];

describe('RadarChart', () => {
  it('renders chart title', () => {
    render(<RadarChart data={mockRadarData} />);
    
    expect(screen.getByText('Performance Radar')).toBeInTheDocument();
  });

  it('renders with provided data', () => {
    render(<RadarChart data={mockRadarData} />);
    
    const chartContainer = document.querySelector('.recharts-wrapper');
    expect(chartContainer).toBeInTheDocument();
  });

  it('handles empty data gracefully', () => {
    render(<RadarChart data={[]} />);
    
    expect(screen.getByText('Performance Radar')).toBeInTheDocument();
  });
});
