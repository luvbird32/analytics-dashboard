
import { CryptoData, CandlestickData } from '@/types/dashboard';

/**
 * Cryptocurrency analytics data generation service
 * Handles crypto price data, candlestick charts, and market metrics
 */
export class CryptoService {
  /**
   * Generates cryptocurrency data
   */
  static generateCryptoData(): CryptoData[] {
    let currentPrice = 45000;
    return Array.from({ length: 24 }, (_, i) => {
      const change = (Math.random() - 0.5) * 2000;
      currentPrice += change;
      
      return {
        timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        price: Math.round(currentPrice),
        volume: Math.floor(Math.random() * 1000000) + 500000,
        marketCap: Math.round(currentPrice * 19000000),
        change24h: change / currentPrice * 100
      };
    });
  }

  /**
   * Generates candlestick data for financial charts
   */
  static generateCandlestickData(): CandlestickData[] {
    let currentPrice = 100;
    return Array.from({ length: 30 }, (_, i) => {
      const open = currentPrice;
      const close = open + (Math.random() - 0.5) * 10;
      const high = Math.max(open, close) + Math.random() * 5;
      const low = Math.min(open, close) - Math.random() * 5;
      currentPrice = close;
      
      return {
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        open: Math.round(open * 100) / 100,
        high: Math.round(high * 100) / 100,
        low: Math.round(low * 100) / 100,
        close: Math.round(close * 100) / 100,
        volume: Math.floor(Math.random() * 1000000)
      };
    });
  }
}
