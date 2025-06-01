
import { render, screen } from '@/test/utils/testUtils';
import { CryptoChart } from '../CryptoChart';

const mockCryptoData = [
  {
    timestamp: '10:00',
    price: 45000,
    volume: 1000000,
    marketCap: 855000000000,
    change24h: 2.5
  }
];

describe('CryptoChart', () => {
  it('renders with default BTC symbol', () => {
    render(<CryptoChart data={mockCryptoData} />);
    
    expect(screen.getByText('BTC Price & Volume')).toBeInTheDocument();
  });

  it('renders with custom symbol', () => {
    render(<CryptoChart data={mockCryptoData} symbol="ETH" />);
    
    expect(screen.getByText('ETH Price & Volume')).toBeInTheDocument();
  });

  it('renders chart with data', () => {
    render(<CryptoChart data={mockCryptoData} />);
    
    const chartContainer = document.querySelector('.recharts-wrapper');
    expect(chartContainer).toBeInTheDocument();
  });
});
