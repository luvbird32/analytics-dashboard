
# 🧪 Accessibility Testing

Comprehensive testing strategies for accessibility compliance.

## Automated Testing Setup

### Jest + axe-core

```typescript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('component has no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Testing Utilities

```typescript
// src/test/utils/a11yTestUtils.ts
export const testAccessibility = async (component: React.ReactElement) => {
  const { container } = render(component);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  return { container, results };
};

export const testKeyboardNavigation = (element: HTMLElement, expectedFocus: HTMLElement) => {
  element.focus();
  fireEvent.keyDown(element, { key: 'Tab' });
  expect(expectedFocus).toHaveFocus();
};

export const testScreenReader = (element: HTMLElement, expectedLabel: string) => {
  expect(element).toHaveAccessibleName(expectedLabel);
};
```

## Manual Testing Checklist

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical and intuitive
- [ ] Focus indicators are clearly visible
- [ ] Escape key closes modals/dropdowns
- [ ] Arrow keys work for navigation where appropriate

### Screen Reader Testing
- [ ] All images have appropriate alt text
- [ ] Form elements have proper labels
- [ ] Headings create logical structure
- [ ] Live regions announce dynamic content
- [ ] Error messages are announced

### Visual Testing
- [ ] Text has sufficient color contrast (4.5:1 for normal, 3:1 for large)
- [ ] UI works at 200% zoom
- [ ] Content reflows properly
- [ ] No information conveyed by color alone

## Testing Tools

### Browser Extensions
- **axe DevTools**: Automated accessibility scanning
- **WAVE**: Web accessibility evaluation
- **Lighthouse**: Performance and accessibility audit

### Screen Readers
- **NVDA** (Windows): Free screen reader
- **JAWS** (Windows): Professional screen reader  
- **VoiceOver** (macOS): Built-in screen reader
- **Orca** (Linux): Open source screen reader

### Testing Commands

```bash
# Run accessibility tests
npm run test:a11y

# Run with coverage
npm run test:a11y:coverage

# Run specific test file
npm test -- accessibility.test.tsx

# Generate accessibility report
npm run a11y:report
```

## Continuous Integration

```yaml
# .github/workflows/accessibility.yml
name: Accessibility Tests
on: [push, pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run test:a11y
      - run: npm run build
      
      # Lighthouse CI for accessibility scoring
      - run: npm install -g @lhci/cli
      - run: lhci autorun
```

## Test Examples

```typescript
describe('Dashboard Accessibility', () => {
  test('MetricCard is accessible', async () => {
    await testAccessibility(
      <MetricCard title="Revenue" value="$1,234" />
    );
  });

  test('Chart supports keyboard navigation', () => {
    render(<AccessibleChart data={mockData} />);
    
    const chart = screen.getByRole('img');
    testKeyboardNavigation(chart, chart);
    
    fireEvent.keyDown(chart, { key: 'ArrowRight' });
    // Test navigation logic
  });

  test('Modal traps focus', () => {
    render(<Modal isOpen><button>Close</button></Modal>);
    
    const modal = screen.getByRole('dialog');
    const closeButton = screen.getByRole('button');
    
    expect(closeButton).toHaveFocus();
    
    fireEvent.keyDown(closeButton, { key: 'Tab' });
    expect(closeButton).toHaveFocus(); // Focus should loop
  });
});
```
