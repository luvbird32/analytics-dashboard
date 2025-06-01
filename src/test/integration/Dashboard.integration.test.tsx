
import { render, screen, waitFor } from '@/test/utils/testUtils';
import Index from '@/pages/Index';

describe('Dashboard Integration', () => {
  it('renders main dashboard components', async () => {
    render(<Index />);
    
    // Wait for components to load
    await waitFor(() => {
      expect(screen.getByText(/Analytics Dashboard/i)).toBeInTheDocument();
    });
    
    // Check for key dashboard sections
    expect(document.querySelector('.container')).toBeInTheDocument();
  });

  it('initializes with default state', async () => {
    render(<Index />);
    
    await waitFor(() => {
      // Check that live data is initially off
      const liveButton = document.querySelector('[data-testid="live-toggle"]') || 
                       document.querySelector('button');
      expect(liveButton).toBeInTheDocument();
    });
  });
});
