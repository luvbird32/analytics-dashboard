
/**
 * AI-powered data processing service for cleaning and retraining algorithms
 */
export class DataProcessingService {
  /**
   * Clean and validate metrics data using AI algorithms
   */
  static cleanMetricsData(rawData: any[]): any[] {
    console.log('🧹 Cleaning metrics data with AI algorithms...');
    
    return rawData
      .filter(item => this.isValidDataPoint(item))
      .map(item => this.normalizeDataPoint(item))
      .filter(item => !this.isOutlier(item));
  }

  /**
   * Detect and remove outliers using statistical methods
   */
  private static isOutlier(dataPoint: any): boolean {
    const { value } = dataPoint;
    if (typeof value !== 'number') return true;
    
    // Simple outlier detection using z-score
    const mean = 150; // Expected mean for demo
    const stdDev = 50; // Expected standard deviation
    const zScore = Math.abs((value - mean) / stdDev);
    
    return zScore > 3; // Remove data points with z-score > 3
  }

  /**
   * Validate individual data points
   */
  private static isValidDataPoint(item: any): boolean {
    return item && 
           typeof item.value === 'number' && 
           !isNaN(item.value) && 
           item.timestamp &&
           item.label;
  }

  /**
   * Normalize data points to standard format
   */
  private static normalizeDataPoint(item: any): any {
    return {
      ...item,
      value: Math.max(0, Number(item.value)), // Ensure positive values
      timestamp: new Date(item.timestamp).toISOString(),
      confidence: this.calculateConfidence(item)
    };
  }

  /**
   * Calculate confidence score for data point
   */
  private static calculateConfidence(item: any): number {
    let confidence = 1.0;
    
    // Reduce confidence for extreme values
    if (item.value > 1000 || item.value < 0) confidence *= 0.7;
    
    // Reduce confidence for missing metadata
    if (!item.category) confidence *= 0.8;
    
    return Math.max(0.1, confidence);
  }

  /**
   * Retrain model with new data patterns
   */
  static retrainModel(historicalData: any[], newData: any[]): {
    accuracy: number;
    predictions: any[];
    modelVersion: string;
  } {
    console.log('🤖 Retraining AI model with new data patterns...');
    
    const combinedData = [...historicalData, ...newData];
    const cleanedData = this.cleanMetricsData(combinedData);
    
    // Simulate model training process
    const accuracy = this.calculateModelAccuracy(cleanedData);
    const predictions = this.generatePredictions(cleanedData);
    
    return {
      accuracy,
      predictions,
      modelVersion: `v${Date.now()}`
    };
  }

  /**
   * Calculate model accuracy based on data quality
   */
  private static calculateModelAccuracy(data: any[]): number {
    const qualityScore = data.reduce((acc, item) => acc + (item.confidence || 0.5), 0) / data.length;
    const dataSize = Math.min(data.length / 1000, 1); // Normalize by expected size
    
    return Math.min(0.95, 0.6 + (qualityScore * 0.2) + (dataSize * 0.15));
  }

  /**
   * Generate predictions using trained model
   */
  private static generatePredictions(data: any[]): any[] {
    const recentData = data.slice(-10);
    const trend = this.calculateTrend(recentData);
    
    return Array.from({ length: 5 }, (_, i) => {
      const lastValue = recentData[recentData.length - 1]?.value || 100;
      const prediction = lastValue + (trend * (i + 1)) + (Math.random() - 0.5) * 20;
      
      return {
        timestamp: new Date(Date.now() + (i + 1) * 60000).toISOString(),
        predictedValue: Math.max(0, prediction),
        confidence: 0.85 - (i * 0.1),
        type: 'prediction'
      };
    });
  }

  /**
   * Calculate trend from recent data
   */
  private static calculateTrend(data: any[]): number {
    if (data.length < 2) return 0;
    
    const values = data.map(item => item.value);
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = values.reduce((acc, y, i) => acc + (i * y), 0);
    const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;
    
    return (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  }

  /**
   * Analyze data quality and suggest improvements
   */
  static analyzeDataQuality(data: any[]): {
    score: number;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];
    
    // Check for missing values
    const missingValues = data.filter(item => !this.isValidDataPoint(item)).length;
    if (missingValues > 0) {
      issues.push(`${missingValues} data points with missing values`);
      recommendations.push('Implement data validation at collection point');
    }
    
    // Check for outliers
    const outliers = data.filter(item => this.isOutlier(item)).length;
    if (outliers > data.length * 0.05) {
      issues.push(`${outliers} potential outliers detected`);
      recommendations.push('Review data collection process for anomalies');
    }
    
    // Check data freshness
    const latestTimestamp = Math.max(...data.map(item => new Date(item.timestamp).getTime()));
    const isStale = Date.now() - latestTimestamp > 300000; // 5 minutes
    if (isStale) {
      issues.push('Data appears to be stale');
      recommendations.push('Increase data collection frequency');
    }
    
    const score = Math.max(0, 1 - (issues.length * 0.2));
    
    return { score, issues, recommendations };
  }
}
