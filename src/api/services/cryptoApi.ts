
/**
 * Cryptocurrency API service
 * Handles all crypto-related API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export class CryptoApi {
  /**
   * Get current cryptocurrency prices
   */
  static async getPrices(symbols?: string[]) {
    return apiClient.get(API_ENDPOINTS.CRYPTO.GET_PRICES, { 
      symbols: symbols?.join(',') 
    });
  }

  /**
   * Get price history for a specific cryptocurrency
   */
  static async getPriceHistory(symbol: string, period: string = '30d') {
    return apiClient.get(API_ENDPOINTS.CRYPTO.GET_PRICE_HISTORY, { symbol, period });
  }

  /**
   * Get market data
   */
  static async getMarketData() {
    return apiClient.get(API_ENDPOINTS.CRYPTO.GET_MARKET_DATA);
  }

  /**
   * Get portfolio data
   */
  static async getPortfolio() {
    return apiClient.get(API_ENDPOINTS.CRYPTO.GET_PORTFOLIO);
  }

  /**
   * Get crypto news
   */
  static async getNews(limit: number = 10) {
    return apiClient.get(API_ENDPOINTS.CRYPTO.GET_NEWS, { limit });
  }
}
