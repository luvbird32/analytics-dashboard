
import { SankeyData, CandlestickData, DonutData, BarData } from '@/types/dashboard';

/**
 * Service for generating financial chart data
 */
export class FinancialChartsService {
  /**
   * Generates Sankey diagram data for flow visualization
   */
  static generateSankeyData(): SankeyData {
    return {
      nodes: [
        { id: 'Traffic', name: 'Website Traffic' },
        { id: 'Visitors', name: 'Unique Visitors' },
        { id: 'Leads', name: 'Qualified Leads' },
        { id: 'Customers', name: 'New Customers' },
        { id: 'Revenue', name: 'Revenue Generated' }
      ],
      links: [
        { source: 'Traffic', target: 'Visitors', value: 7500 },
        { source: 'Visitors', target: 'Leads', value: 2500 },
        { source: 'Leads', target: 'Customers', value: 750 },
        { source: 'Customers', target: 'Revenue', value: 500000 }
      ]
    };
  }

  /**
   * Generates candlestick chart data for financial analysis
   */
  static generateCandlestickData(): CandlestickData[] {
    const data: CandlestickData[] = [];
    let basePrice = 100;
    
    for (let i = 0; i < 30; i++) {
      const volatility = 0.02;
      const change = (Math.random() - 0.5) * volatility * basePrice;
      const open = basePrice;
      const close = basePrice + change;
      const high = Math.max(open, close) + Math.random() * 2;
      const low = Math.min(open, close) - Math.random() * 2;
      
      data.push({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        open: Math.round(open * 100) / 100,
        high: Math.round(high * 100) / 100,
        low: Math.round(low * 100) / 100,
        close: Math.round(close * 100) / 100,
        volume: Math.floor(Math.random() * 1000000)
      });
      
      basePrice = close;
    }
    
    return data;
  }

  /**
   * Generates donut chart data for portfolio distribution
   */
  static generateDonutData(): DonutData[] {
    const data = [
      { name: 'Stocks', value: 45, color: '#8884d8' },
      { name: 'Bonds', value: 25, color: '#82ca9d' },
      { name: 'Real Estate', value: 15, color: '#ffc658' },
      { name: 'Commodities', value: 10, color: '#ff7300' },
      { name: 'Cash', value: 5, color: '#00ff88' }
    ];

    return data.map(item => ({
      ...item,
      percentage: (item.value / 100) * 100
    }));
  }

  /**
   * Generates bar chart data for financial metrics
   */
  static generateBarData(): BarData[] {
    return [
      { name: 'Q1', value: 45000, category: 'revenue' },
      { name: 'Q2', value: 52000, category: 'revenue' },
      { name: 'Q3', value: 48000, category: 'revenue' },
      { name: 'Q4', value: 61000, category: 'revenue' }
    ];
  }
}
