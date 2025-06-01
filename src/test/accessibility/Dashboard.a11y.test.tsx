
import { render } from '@/test/utils/testUtils';
import { axe, toHaveNoViolations } from 'jest-axe';
import Index from '@/pages/Index';

expect.extend(toHaveNoViolations);

describe('Dashboard Accessibility Tests', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<Index />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper ARIA labels on interactive elements', () => {
    const { getByRole } = render(<Index />);
    
    // Check for proper button labels
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      expect(
        button.getAttribute('aria-label') || 
        button.textContent ||
        button.getAttribute('title')
      ).toBeTruthy();
    });
  });

  it('maintains proper heading hierarchy', () => {
    render(<Index />);
    
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingLevels = Array.from(headings).map(h => 
      parseInt(h.tagName.charAt(1))
    );

    // Check that heading levels don't skip (e.g., h1 -> h3)
    for (let i = 1; i < headingLevels.length; i++) {
      const diff = headingLevels[i] - headingLevels[i - 1];
      expect(diff).toBeLessThanOrEqual(1);
    }
  });

  it('provides proper focus management', () => {
    const { container } = render(<Index />);
    
    // Check that interactive elements are focusable
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
      expect(element.getAttribute('tabindex')).not.toBe('-1');
    });
  });
});
