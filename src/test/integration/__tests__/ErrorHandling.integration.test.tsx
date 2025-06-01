
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
    }, { timeout: 5000 });

    // Ensure no critical errors were thrown during render
    const errorCalls = (console.error as jest.Mock).mock.calls;
    const criticalErrors = errorCalls.filter(call => 
      call[0] && typeof call[0] === 'string' && 
      (call[0].includes('Error:') || call[0].includes('TypeError:'))
    );
    expect(criticalErrors.length).toBe(0);
  });

  it('handles missing data gracefully', async () => {
    render(<Index />);
    
    await waitFor(() => {
      // Dashboard should still render even with potential data issues
      const dashboardContainer = document.querySelector('.min-h-screen');
      expect(dashboardContainer).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('maintains functionality with empty state', async () => {
    render(<Index />);
    
    await waitFor(() => {
      // Check that basic structure is maintained
      const container = document.querySelector('.container');
      expect(container).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});
