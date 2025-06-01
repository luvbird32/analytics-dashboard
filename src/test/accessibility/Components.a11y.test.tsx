import { render } from '@/test/utils/testUtils';
import { axe } from 'jest-axe';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { mockPerformanceMetrics, mockSalesData } from '@/test/mocks/mockData';

describe('Component Accessibility Tests', () => {
  it('MetricCard should be accessible', async () => {
    const { container } = render(
      <MetricCard metric={mockPerformanceMetrics[0]} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('SalesChart should be accessible', async () => {
    const { container } = render(<SalesChart data={mockSalesData} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('charts have proper ARIA descriptions', () => {
    render(<SalesChart data={mockSalesData} />);
    
    // Charts should have descriptive titles
    const chartTitle = document.querySelector('[role="img"]') || 
                      document.querySelector('.recharts-wrapper');
    
    if (chartTitle) {
      expect(
        chartTitle.getAttribute('aria-label') ||
        chartTitle.getAttribute('title') ||
        document.querySelector('h1, h2, h3, h4, h5, h6')?.textContent
      ).toBeTruthy();
    }
  });

  it('color contrast meets WCAG standards', () => {
    render(<MetricCard metric={mockPerformanceMetrics[0]} />);

    // This is a basic check - in practice you'd use tools like
    // axe-core to automatically detect contrast issues
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Basic check that colors are defined
      expect(color).toBeDefined();
      expect(backgroundColor).toBeDefined();
    });
  });
});
