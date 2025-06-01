
import { render, screen, waitFor } from '@/test/utils/testUtils';
import Index from '@/pages/Index';

// Mock console.error to avoid noise in tests
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('Error Handling Integration', () => {
  it('renders dashboard without throwing errors', async () => {
    const { container } = render(<Index />);
    
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });

    // Ensure no errors were thrown during render
    expect(console.error).not.toHaveBeenCalled();
  });

  it('handles missing data gracefully', async () => {
    render(<Index />);
    
    await waitFor(() => {
      // Dashboard should still render even with potential data issues
      const dashboardContainer = document.querySelector('.container');
      expect(dashboardContainer).toBeInTheDocument();
    });
  });

  it('maintains functionality with empty state', async () => {
    render(<Index />);
    
    await waitFor(() => {
      // Check that basic structure is maintained
      expect(screen.getByText(/Analytics Dashboard/i)).toBeInTheDocument();
    });
  });
});
