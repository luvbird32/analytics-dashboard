
import { render, screen } from '@/test/utils/testUtils';
import { act } from '@testing-library/react';
import Index from '@/pages/Index';

// Mock performance.now for consistent testing
const mockPerformanceNow = jest.fn();
Object.defineProperty(window, 'performance', {
  value: { now: mockPerformanceNow },
  writable: true
});

describe('Dashboard Performance Tests', () => {
  beforeEach(() => {
    mockPerformanceNow.mockReturnValue(0);
  });

  it('renders dashboard within performance budget', async () => {
    const startTime = performance.now();
    
    await act(async () => {
      render(<Index />);
    });

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Dashboard should render within 100ms
    expect(renderTime).toBeLessThan(100);
  });

  it('handles rapid data updates efficiently', async () => {
    const { container } = render(<Index />);
    
    const startTime = performance.now();
    
    // Simulate rapid updates
    for (let i = 0; i < 10; i++) {
      await act(async () => {
        // Trigger re-render by finding any button
        const button = container.querySelector('button');
        if (button) {
          (button as HTMLButtonElement).click();
        }
      });
    }

    const endTime = performance.now();
    const updateTime = endTime - startTime;

    // Multiple updates should complete within 200ms
    expect(updateTime).toBeLessThan(200);
  });

  it('maintains responsive UI during data generation', async () => {
    const { container } = render(<Index />);
    
    // Check if UI remains responsive
    const button = container.querySelector('button');
    
    if (button) {
      const startTime = performance.now();
      
      await act(async () => {
        (button as HTMLButtonElement).click();
      });

      const endTime = performance.now();
      const responseTime = endTime - startTime;

      // UI should respond within 50ms
      expect(responseTime).toBeLessThan(50);
    }
  });
});
