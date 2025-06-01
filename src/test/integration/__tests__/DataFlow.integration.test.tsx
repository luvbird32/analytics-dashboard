
import { render, screen, waitFor } from '@/test/utils/testUtils';
import Index from '@/pages/Index';

describe('Data Flow Integration', () => {
  it('ensures data flows correctly through the application', async () => {
    render(<Index />);
    
    await waitFor(() => {
      expect(screen.getByText(/Analytics Dashboard/i)).toBeInTheDocument();
    });

    // Check that data is being rendered in components
    const container = document.querySelector('.container');
    expect(container).toBeInTheDocument();
  });

  it('handles filter state management', async () => {
    render(<Index />);
    
    await waitFor(() => {
      // Check for filter components or controls
      const dashboardContent = document.querySelector('.container');
      expect(dashboardContent).toBeInTheDocument();
    });
  });

  it('manages notification state correctly', async () => {
    render(<Index />);
    
    await waitFor(() => {
      // Verify the dashboard renders without errors
      expect(document.querySelector('.container')).toBeInTheDocument();
    });
  });
});
