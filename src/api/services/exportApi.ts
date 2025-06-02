
/**
 * Export API service
 * Handles all data export API calls
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv' | 'png';
  data: any;
  filters?: Record<string, any>;
  includeCharts?: boolean;
  filename?: string;
}

export class ExportApi {
  /**
   * Export data as PDF
   */
  static async exportPDF(options: Omit<ExportOptions, 'format'>) {
    return apiClient.post(API_ENDPOINTS.EXPORT.PDF, {
      ...options,
      format: 'pdf'
    });
  }

  /**
   * Export data as Excel
   */
  static async exportExcel(options: Omit<ExportOptions, 'format'>) {
    return apiClient.post(API_ENDPOINTS.EXPORT.EXCEL, {
      ...options,
      format: 'excel'
    });
  }

  /**
   * Export data as CSV
   */
  static async exportCSV(options: Omit<ExportOptions, 'format'>) {
    return apiClient.post(API_ENDPOINTS.EXPORT.CSV, {
      ...options,
      format: 'csv'
    });
  }

  /**
   * Export data as PNG
   */
  static async exportPNG(options: Omit<ExportOptions, 'format'>) {
    return apiClient.post(API_ENDPOINTS.EXPORT.PNG, {
      ...options,
      format: 'png'
    });
  }
}
