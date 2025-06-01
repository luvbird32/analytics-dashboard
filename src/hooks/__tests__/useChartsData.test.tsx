
import { renderHook } from '@testing-library/react';
import { useChartsData } from '../useChartsData';

describe('useChartsData', () => {
  it('returns chart data objects', () => {
    const { result } = renderHook(() => useChartsData());
    
    expect(result.current.areaData).toBeDefined();
    expect(result.current.radarData).toBeDefined();
    expect(result.current.barData).toBeDefined();
    expect(result.current.scatterData).toBeDefined();
    expect(result.current.donutData).toBeDefined();
    expect(result.current.gaugeData).toBeDefined();
    expect(result.current.treemapData).toBeDefined();
    expect(result.current.funnelData).toBeDefined();
    expect(result.current.sankeyData).toBeDefined();
  });

  it('returns data in correct format', () => {
    const { result } = renderHook(() => useChartsData());
    
    expect(Array.isArray(result.current.areaData)).toBe(true);
    expect(Array.isArray(result.current.radarData)).toBe(true);
    expect(Array.isArray(result.current.barData)).toBe(true);
    expect(result.current.areaData.length).toBeGreaterThan(0);
  });
});
