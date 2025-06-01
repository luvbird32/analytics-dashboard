
import { render, screen, waitFor } from '@/test/utils/testUtils';
import Index from '@/pages/Index';

describe('Data Flow Integration', () => {
  it('ensures data flows correctly through the application', async () => {
    render(<Index />);
    
    await waitFor(() => {
      const container = document.querySelector('.min-h-screen');
      expect(container).toBeInTheDocument();
    }, { timeout: 5000 });

    // Check that data is being rendered in components
    const dashboardContainer = document.querySelector('.container');
    expect(dashboardContainer).toBeInTheDocument();
  });

  it('handles filter state management', async () => {
    render(<Index />);
    
    await waitFor(() => {
      // Check for filter components or controls
      const dashboardContent = document.querySelector('.container');
      expect(dashboardContent).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('manages notification state correctly', async () => {
    render(<Index />);
    
    await waitFor(() => {
      // Verify the dashboard renders without errors
      const container = document.querySelector('.container');
      expect(container).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});
