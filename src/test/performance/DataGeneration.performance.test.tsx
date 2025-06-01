
import { DataGeneratorService } from '@/services/dataGenerator';

describe('Data Generation Performance Tests', () => {
  it('generates initial metrics efficiently', () => {
    const startTime = performance.now();
    
    const metrics = DataGeneratorService.generateInitialMetrics();
    
    const endTime = performance.now();
    const generationTime = endTime - startTime;

    expect(metrics).toHaveLength(20);
    expect(generationTime).toBeLessThan(10); // Should be very fast
  });

  it('generates chart data within time budget', () => {
    const startTime = performance.now();
    
    const salesData = DataGeneratorService.generateSalesData();
    const trafficData = DataGeneratorService.generateTrafficData();
    const radarData = DataGeneratorService.generateRadarData();
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;

    expect(salesData.length).toBeGreaterThan(0);
    expect(trafficData.length).toBeGreaterThan(0);
    expect(radarData.length).toBeGreaterThan(0);
    expect(totalTime).toBeLessThan(50);
  });

  it('handles large dataset generation efficiently', () => {
    const startTime = performance.now();
    
    // Generate large dataset
    const largeDataset = Array.from({ length: 1000 }, (_, i) => 
      DataGeneratorService.generateNewMetric(i)
    );
    
    const endTime = performance.now();
    const generationTime = endTime - startTime;

    expect(largeDataset).toHaveLength(1000);
    expect(generationTime).toBeLessThan(100);
  });
});
