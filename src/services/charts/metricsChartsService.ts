
/**
 * Service for generating metrics and real-time data
 */
export class MetricsChartsService {
  /**
   * Generates initial metrics data for testing
   */
  static generateInitialMetrics() {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        timestamp: `${String(i).padStart(2, '0')}:00`,
        value: Math.floor(Math.random() * 1000) + 100,
        label: `Metric ${i + 1}`,
        category: ['revenue', 'users', 'conversion'][Math.floor(Math.random() * 3)]
      });
    }
    return data;
  }

  /**
   * Generates a single new metric for real-time updates
   */
  static generateNewMetric(index: number) {
    return {
      timestamp: new Date().toLocaleTimeString(),
      value: Math.floor(Math.random() * 1000) + 100,
      label: `Live ${index}`,
      category: ['revenue', 'users', 'conversion'][Math.floor(Math.random() * 3)]
    };
  }
}
