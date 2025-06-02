
/**
 * Centralized API endpoints configuration
 * Provides all API endpoints for the dashboard services
 */

export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://api.dashboard.com';

export const API_ENDPOINTS = {
  // Core Metrics APIs
  METRICS: {
    GET_DASHBOARD_METRICS: '/api/metrics/dashboard',
    GET_PERFORMANCE_METRICS: '/api/metrics/performance',
    UPDATE_METRIC: '/api/metrics/update',
    GET_TRENDS: '/api/metrics/trends',
    GET_REAL_TIME: '/api/metrics/realtime'
  },

  // Charts Data APIs
  CHARTS: {
    GET_SALES_DATA: '/api/charts/sales',
    GET_TRAFFIC_DATA: '/api/charts/traffic',
    GET_AREA_DATA: '/api/charts/area',
    GET_RADAR_DATA: '/api/charts/radar',
    GET_HEATMAP_DATA: '/api/charts/heatmap',
    GET_TREEMAP_DATA: '/api/charts/treemap',
    GET_SCATTER_DATA: '/api/charts/scatter',
    GET_FUNNEL_DATA: '/api/charts/funnel',
    GET_GAUGE_DATA: '/api/charts/gauge',
    GET_SANKEY_DATA: '/api/charts/sankey',
    GET_CANDLESTICK_DATA: '/api/charts/candlestick',
    GET_DONUT_DATA: '/api/charts/donut',
    GET_BAR_DATA: '/api/charts/bar'
  },

  // Social Media APIs
  SOCIAL: {
    GET_SENTIMENT_DATA: '/api/social/sentiment',
    GET_ENGAGEMENT_DATA: '/api/social/engagement',
    GET_HASHTAG_DATA: '/api/social/hashtags',
    GET_PLATFORM_STATS: '/api/social/platforms',
    GET_TRENDING_TOPICS: '/api/social/trending'
  },

  // Cryptocurrency APIs
  CRYPTO: {
    GET_PRICES: '/api/crypto/prices',
    GET_PRICE_HISTORY: '/api/crypto/history',
    GET_MARKET_DATA: '/api/crypto/market',
    GET_PORTFOLIO: '/api/crypto/portfolio',
    GET_NEWS: '/api/crypto/news'
  },

  // Notifications APIs
  NOTIFICATIONS: {
    GET_ALL: '/api/notifications',
    CREATE: '/api/notifications',
    UPDATE: '/api/notifications/:id',
    DELETE: '/api/notifications/:id',
    MARK_READ: '/api/notifications/:id/read',
    CLEAR_ALL: '/api/notifications/clear'
  },

  // Export APIs
  EXPORT: {
    PDF: '/api/export/pdf',
    EXCEL: '/api/export/excel',
    CSV: '/api/export/csv',
    PNG: '/api/export/png'
  },

  // Analytics APIs
  ANALYTICS: {
    GET_DETAILED: '/api/analytics/detailed',
    GET_USER_BEHAVIOR: '/api/analytics/user-behavior',
    GET_REVENUE: '/api/analytics/revenue',
    GET_CONVERSION: '/api/analytics/conversion',
    GET_SESSION_METRICS: '/api/analytics/sessions'
  },

  // AI/ML APIs
  AI: {
    PROCESS_DATA: '/api/ai/process',
    GET_PREDICTIONS: '/api/ai/predictions',
    TRAIN_MODEL: '/api/ai/train',
    GET_INSIGHTS: '/api/ai/insights',
    RETRAIN: '/api/ai/retrain'
  },

  // User Management APIs
  USERS: {
    GET_PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
    GET_PREFERENCES: '/api/users/preferences',
    UPDATE_PREFERENCES: '/api/users/preferences',
    GET_SESSIONS: '/api/users/sessions'
  },

  // Filter APIs
  FILTERS: {
    SAVE: '/api/filters/save',
    GET_SAVED: '/api/filters/saved',
    DELETE: '/api/filters/:id',
    APPLY: '/api/filters/apply'
  },

  // Real-time APIs
  REALTIME: {
    CONNECT: '/api/realtime/connect',
    SUBSCRIBE: '/api/realtime/subscribe',
    UNSUBSCRIBE: '/api/realtime/unsubscribe',
    BROADCAST: '/api/realtime/broadcast'
  },

  // Security APIs
  SECURITY: {
    SANITIZE: '/api/security/sanitize',
    VALIDATE: '/api/security/validate',
    AUDIT_LOG: '/api/security/audit'
  }
};

/**
 * Helper function to build complete API URLs
 */
export const buildApiUrl = (endpoint: string, params?: Record<string, string>): string => {
  let url = `${API_BASE_URL}${endpoint}`;
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });
  }
  
  return url;
};

/**
 * Common API response types
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
