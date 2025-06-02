
/**
 * Charts API service
 * Handles all chart data API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export class ChartsApi {
  /**
   * Get sales chart data
   */
  static async getSalesData(dateRange?: string) {
    return apiClient.get(API_ENDPOINTS.CHARTS.GET_SALES_DATA, { dateRange });
  }

  /**
   * Get traffic chart data
   */
  static async getTrafficData(dateRange?: string) {
    return apiClient.get(API_ENDPOINTS.CHARTS.GET_TRAFFIC_DATA, { dateRange });
  }

  /**
   * Get area chart data
   */
  static async getAreaData() {
    return apiClient.get(API_ENDPOINTS.CHARTS.GET_AREA_DATA);
  }

  /**
   * Get radar chart data
   */
  static async getRadarData() {
    return apiClient.get(API_ENDPOINTS.CHARTS.GET_RADAR_DATA);
  }

  /**
   * Get heatmap data
   */
  static async getHeatmapData() {
    return apiClient.get(API_ENDPOINTS.CHARTS.GET_HEATMAP_DATA);
  }

  /**
   * Get treemap data
   */
  static async getTreemapData() {
    return apiClient.get(API_ENDPOINTS.CHARTS.GET_TREEMAP_DATA);
  }

  /**
   * Get scatter plot data
   */
  static async getScatterData() {
    return apiClient.get(API_ENDPOINTS.CHARTS.GET_SCATTER_DATA);
  }

  /**
   * Get funnel chart data
   */
  static async getFunnelData() {
    return apiClient.get(API_ENDPOINTS.CHARTS.GET_FUNNEL_DATA);
  }

  /**
   * Get gauge chart data
   */
  static async getGaugeData() {
    return apiClient.get(API_ENDPOINTS.CHARTS.GET_GAUGE_DATA);
  }

  /**
   * Get sankey diagram data
   */
  static async getSankeyData() {
    return apiClient.get(API_ENDPOINTS.CHARTS.GET_SANKEY_DATA);
  }

  /**
   * Get candlestick chart data
   */
  static async getCandlestickData(symbol: string = 'BTC') {
    return apiClient.get(API_ENDPOINTS.CHARTS.GET_CANDLESTICK_DATA, { symbol });
  }

  /**
   * Get donut chart data
   */
  static async getDonutData() {
    return apiClient.get(API_ENDPOINTS.CHARTS.GET_DONUT_DATA);
  }

  /**
   * Get bar chart data
   */
  static async getBarData() {
    return apiClient.get(API_ENDPOINTS.CHARTS.GET_BAR_DATA);
  }
}
