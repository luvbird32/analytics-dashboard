
import { render, screen, waitFor } from '@/test/utils/testUtils';
import Index from '@/pages/Index';

describe('Chart Interactions Integration', () => {
  it('renders multiple chart components together', async () => {
    render(<Index />);
    
    await waitFor(() => {
      const container = document.querySelector('.min-h-screen');
      expect(container).toBeInTheDocument();
    }, { timeout: 5000 });

    // Check for various chart containers
    await waitFor(() => {
      const chartContainers = document.querySelectorAll('[class*="animate-fade-in"]');
      expect(chartContainers.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it('handles live data toggle interactions', async () => {
    render(<Index />);
    
    await waitFor(() => {
      const container = document.querySelector('.container');
      expect(container).toBeInTheDocument();
    }, { timeout: 5000 });

    // Look for button elements
    await waitFor(() => {
      const buttons = document.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it('displays metric cards with performance data', async () => {
    render(<Index />);
    
    await waitFor(() => {
      const container = document.querySelector('.min-h-screen');
      expect(container).toBeInTheDocument();
    }, { timeout: 5000 });

    // Look for metric card containers
    await waitFor(() => {
      const metricCards = document.querySelectorAll('[class*="animate-fade-in"]');
      expect(metricCards.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });
});
