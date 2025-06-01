
import { renderHook, act } from '@testing-library/react';
import { useRealTimeData } from '../useRealTimeData';

// Mock the metrics service
jest.mock('@/services/core/metricsService', () => ({
  MetricsService: {
    generateMetrics: jest.fn(() => [
      { timestamp: '10:00', value: 100, label: 'Test', category: 'test' }
    ])
  }
}));

describe('useRealTimeData', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useRealTimeData());
    
    expect(result.current.isLive).toBe(false);
    expect(result.current.lastUpdate).toBeNull();
    expect(Array.isArray(result.current.metrics)).toBe(true);
  });

  it('toggles live state', () => {
    const { result } = renderHook(() => useRealTimeData());
    
    act(() => {
      result.current.toggleLive();
    });
    
    expect(result.current.isLive).toBe(true);
  });

  it('updates metrics when live', () => {
    const { result } = renderHook(() => useRealTimeData());
    
    act(() => {
      result.current.toggleLive();
    });
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    expect(result.current.lastUpdate).not.toBeNull();
  });
});
