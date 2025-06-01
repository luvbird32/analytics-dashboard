
# 🧪 Testing Guide

Comprehensive testing strategy for the Analytics Dashboard.

## 📚 Testing Documentation

### Testing Types
- [🔧 Unit Testing](../src/test/)
- [🔗 Integration Testing](../src/test/integration/)
- [♿ Accessibility Testing](../src/test/accessibility/)
- [⚡ Performance Testing](../src/test/performance/)
- [👁️ Visual Testing](../src/test/visual/)

## 🚀 Quick Testing Setup

### Running Tests

```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# Accessibility tests
npm run test:a11y

# Performance tests
npm run test:performance

# Visual regression tests
npm run test:visual
```

### Test Structure

```typescript
// Component test example
describe('MetricCard', () => {
  it('displays metric data correctly', () => {
    render(<MetricCard title="Revenue" value={1000} />);
    
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    render(<MetricCard title="Revenue" isLoading={true} />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
```

### Hook Testing

```typescript
// Custom hook test
import { renderHook, act } from '@testing-library/react-hooks';
import { useMetrics } from '../useMetrics';

describe('useMetrics', () => {
  it('updates metrics correctly', () => {
    const { result } = renderHook(() => useMetrics());
    
    act(() => {
      result.current.updateMetrics([newMetric]);
    });
    
    expect(result.current.metrics).toHaveLength(1);
  });
});
```

## 🎯 Testing Coverage Goals

- **Unit Tests**: 90%+ coverage
- **Integration Tests**: Critical user flows
- **Accessibility**: All interactive components
- **Performance**: Core metrics under thresholds
- **Visual**: Key UI components

## 🔧 Configuration Files

Tests are configured in:
- `jest.config.js` - Jest configuration
- `src/test/setup.ts` - Test environment setup
- `src/test/utils/testUtils.tsx` - Testing utilities

For detailed testing examples, explore the test files in the `src/test/` directory.
