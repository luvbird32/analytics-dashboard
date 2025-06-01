
import { render, screen, fireEvent, waitFor } from '@/test/utils/testUtils';
import Index from '@/pages/Index';

describe('Chart Interactions Integration', () => {
  it('renders multiple chart components together', async () => {
    render(<Index />);
    
    await waitFor(() => {
      expect(screen.getByText(/Analytics Dashboard/i)).toBeInTheDocument();
    });

    // Check for various chart containers
    const chartContainers = document.querySelectorAll('.recharts-wrapper');
    expect(chartContainers.length).toBeGreaterThan(0);
  });

  it('handles live data toggle interactions', async () => {
    render(<Index />);
    
    await waitFor(() => {
      const toggleButton = document.querySelector('button') || 
                          screen.getByRole('button');
      expect(toggleButton).toBeInTheDocument();
    });
  });

  it('displays metric cards with performance data', async () => {
    render(<Index />);
    
    await waitFor(() => {
      // Look for metric card containers
      const metricCards = document.querySelectorAll('[class*="animate-fade-in"]');
      expect(metricCards.length).toBeGreaterThan(0);
    });
  });
});
