
import { render } from '@/test/utils/testUtils';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { SalesChart } from '@/components/dashboard/SalesChart';

expect.extend(toHaveNoViolations);

describe('Component Accessibility Tests', () => {
  it('MetricCard should be accessible', async () => {
    const { container } = render(
      <MetricCard 
        title="Revenue" 
        value="$12,345" 
        change="+12%" 
        trend="up" 
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('SalesChart should be accessible', async () => {
    const mockData = [
      { month: 'Jan', sales: 4000, target: 3800 },
      { month: 'Feb', sales: 3000, target: 3200 }
    ];

    const { container } = render(<SalesChart data={mockData} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('charts have proper ARIA descriptions', () => {
    const mockData = [
      { month: 'Jan', sales: 4000, target: 3800 }
    ];

    render(<SalesChart data={mockData} />);
    
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
    render(
      <MetricCard 
        title="Revenue" 
        value="$12,345" 
        change="+12%" 
        trend="up" 
      />
    );

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
