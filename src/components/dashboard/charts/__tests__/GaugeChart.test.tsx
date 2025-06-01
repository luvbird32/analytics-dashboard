
import { render, screen } from '@/test/utils/testUtils';
import { GaugeChart } from '../GaugeChart';

const mockGaugeData = [
  {
    name: 'Performance',
    value: 75,
    max: 100,
    segments: [
      { min: 0, max: 50, color: '#ef4444', label: 'Poor' },
      { min: 51, max: 80, color: '#f59e0b', label: 'Good' },
      { min: 81, max: 100, color: '#10b981', label: 'Excellent' }
    ]
  }
];

describe('GaugeChart', () => {
  it('renders chart title', () => {
    render(<GaugeChart data={mockGaugeData} />);
    
    expect(screen.getByText('Performance Gauges')).toBeInTheDocument();
  });

  it('displays gauge name and value', () => {
    render(<GaugeChart data={mockGaugeData} />);
    
    expect(screen.getByText('Performance')).toBeInTheDocument();
    expect(screen.getByText('75/100')).toBeInTheDocument();
  });

  it('displays segment labels', () => {
    render(<GaugeChart data={mockGaugeData} />);
    
    expect(screen.getByText('Poor')).toBeInTheDocument();
    expect(screen.getByText('Good')).toBeInTheDocument();
    expect(screen.getByText('Excellent')).toBeInTheDocument();
  });
});
