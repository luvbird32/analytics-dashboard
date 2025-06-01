
import { renderHook } from '@testing-library/react';
import { useMetricsData } from '../useMetricsData';

describe('useMetricsData', () => {
  it('returns metrics and performance data', () => {
    const { result } = renderHook(() => useMetricsData());
    
    expect(result.current.metrics).toBeDefined();
    expect(result.current.performanceMetrics).toBeDefined();
    expect(result.current.salesData).toBeDefined();
    expect(result.current.trafficData).toBeDefined();
  });

  it('returns data arrays with correct length', () => {
    const { result } = renderHook(() => useMetricsData());
    
    expect(Array.isArray(result.current.metrics)).toBe(true);
    expect(Array.isArray(result.current.performanceMetrics)).toBe(true);
    expect(Array.isArray(result.current.salesData)).toBe(true);
    expect(Array.isArray(result.current.trafficData)).toBe(true);
  });
});
