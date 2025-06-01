
import { GeographicData, BrushData, Surface3DData } from '@/types/echarts';

/**
 * Service for generating ECharts-specific data
 */
export class EChartsDataService {
  /**
   * Generate geographic heat map data
   */
  static generateGeographicData(): GeographicData[] {
    const cities = [
      { name: 'New York', coordinates: [-74.006, 40.7128], population: 8400000 },
      { name: 'London', coordinates: [-0.1276, 51.5074], population: 9000000 },
      { name: 'Tokyo', coordinates: [139.6917, 35.6895], population: 14000000 },
      { name: 'Paris', coordinates: [2.3522, 48.8566], population: 2200000 },
      { name: 'Berlin', coordinates: [13.4050, 52.5200], population: 3700000 },
      { name: 'Sydney', coordinates: [151.2093, -33.8688], population: 5300000 },
      { name: 'São Paulo', coordinates: [-46.6333, -23.5505], population: 12300000 },
      { name: 'Mumbai', coordinates: [72.8777, 19.0760], population: 20400000 },
      { name: 'Shanghai', coordinates: [121.4737, 31.2304], population: 28500000 },
      { name: 'Dubai', coordinates: [55.2708, 25.2048], population: 3400000 }
    ];

    return cities.map(city => ({
      name: city.name,
      value: Math.floor(city.population / 1000 + Math.random() * 1000),
      coordinates: city.coordinates as [number, number]
    }));
  }

  /**
   * Generate brush chart data
   */
  static generateBrushData(): BrushData[] {
    const data: BrushData[] = [];
    const startDate = new Date('2024-01-01');
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.sin(i / 30) * 50 + Math.random() * 20 + 100,
        category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
      });
    }
    
    return data;
  }

  /**
   * Generate 3D surface data
   */
  static generateSurface3DData(): Surface3DData[] {
    const data: Surface3DData[] = [];
    
    for (let x = 0; x < 20; x++) {
      for (let y = 0; y < 20; y++) {
        const z = Math.sin(x / 5) * Math.cos(y / 5) * 50 + 
                  Math.random() * 10;
        data.push({ x, y, z });
      }
    }
    
    return data;
  }
}
