
/**
 * Service for generating financial chart data (candlestick, donut, bar, sankey)
 */
export class FinancialChartsService {
  /**
   * Generates Sankey diagram data for flow visualization
   */
  static generateSankeyData() {
    return {
      nodes: [
        { id: 'source1', name: 'Organic Search' },
        { id: 'source2', name: 'Social Media' },
        { id: 'source3', name: 'Direct Traffic' },
        { id: 'page1', name: 'Homepage' },
        { id: 'page2', name: 'Product Page' },
        { id: 'outcome1', name: 'Purchase' },
        { id: 'outcome2', name: 'Signup' },
        { id: 'outcome3', name: 'Exit' }
      ],
      links: [
        { source: 'source1', target: 'page1', value: 4000 },
        { source: 'source2', target: 'page1', value: 2000 },
        { source: 'source3', target: 'page2', value: 3000 },
        { source: 'page1', target: 'outcome1', value: 2500 },
        { source: 'page1', target: 'outcome2', value: 1500 },
        { source: 'page2', target: 'outcome1', value: 2000 },
        { source: 'page2', target: 'outcome3', value: 1000 }
      ]
    };
  }

  /**
   * Generates candlestick data for financial visualization
   */
  static generateCandlestickData() {
    const data = [];
    let price = 100;
    
    for (let i = 0; i < 30; i++) {
      const change = (Math.random() - 0.5) * 10;
      price += change;
      
      const open = price;
      const close = price + (Math.random() - 0.5) * 5;
      const high = Math.max(open, close) + Math.random() * 3;
      const low = Math.min(open, close) - Math.random() * 3;
      
      data.push({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        open: Number(open.toFixed(2)),
        close: Number(close.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000)
      });
    }
    
    return data;
  }

  /**
   * Generates donut chart data for category distribution
   */
  static generateDonutData() {
    const data = [
      { name: 'Desktop', value: 45, color: '#8884d8' },
      { name: 'Mobile', value: 35, color: '#82ca9d' },
      { name: 'Tablet', value: 15, color: '#ffc658' },
      { name: 'Other', value: 5, color: '#ff7300' }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);
    return data.map(item => ({
      ...item,
      percentage: Number(((item.value / total) * 100).toFixed(1))
    }));
  }

  /**
   * Generates bar chart data for performance vs targets
   */
  static generateBarData() {
    return [
      { name: 'Q1 Sales', value: 8500, target: 9000, category: 'sales' },
      { name: 'Q2 Sales', value: 9200, target: 9500, category: 'sales' },
      { name: 'Q3 Sales', value: 8800, target: 8500, category: 'sales' },
      { name: 'Q4 Sales', value: 9600, target: 10000, category: 'sales' },
      { name: 'Marketing', value: 7200, target: 7500, category: 'marketing' },
      { name: 'Support', value: 8900, target: 8000, category: 'support' }
    ];
  }
}
