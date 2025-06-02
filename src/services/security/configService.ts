
import { z } from 'zod';

/**
 * Secure configuration service with validation and fallbacks
 */
export class ConfigService {
  private static config: Record<string, any> = {};
  private static isInitialized = false;

  /**
   * Environment variable schema for validation
   */
  private static envSchema = z.object({
    VITE_ENABLE_REAL_TIME: z.string().optional().default('true'),
    VITE_ENABLE_NOTIFICATIONS: z.string().optional().default('true'),
    VITE_ENABLE_EXPORTS: z.string().optional().default('true'),
    VITE_ENABLE_AI_FEATURES: z.string().optional().default('true'),
    VITE_STORAGE_QUOTA_WARNING: z.string().optional().default('0.8'),
    VITE_CACHE_DURATION: z.string().optional().default('3600000'),
    VITE_UPDATE_INTERVAL: z.string().optional().default('2000'),
    VITE_DEBUG_MODE: z.string().optional().default('false'),
    VITE_LOG_LEVEL: z.string().optional().default('info'),
    VITE_API_BASE_URL: z.string().url().optional(),
    VITE_ANALYTICS_ID: z.string().optional()
  });

  /**
   * Initialize configuration with validation
   */
  static initialize(): void {
    if (this.isInitialized) return;

    try {
      // Validate environment variables
      const envVars = {
        VITE_ENABLE_REAL_TIME: import.meta.env.VITE_ENABLE_REAL_TIME,
        VITE_ENABLE_NOTIFICATIONS: import.meta.env.VITE_ENABLE_NOTIFICATIONS,
        VITE_ENABLE_EXPORTS: import.meta.env.VITE_ENABLE_EXPORTS,
        VITE_ENABLE_AI_FEATURES: import.meta.env.VITE_ENABLE_AI_FEATURES,
        VITE_STORAGE_QUOTA_WARNING: import.meta.env.VITE_STORAGE_QUOTA_WARNING,
        VITE_CACHE_DURATION: import.meta.env.VITE_CACHE_DURATION,
        VITE_UPDATE_INTERVAL: import.meta.env.VITE_UPDATE_INTERVAL,
        VITE_DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE,
        VITE_LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL,
        VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
        VITE_ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID
      };

      const validatedConfig = this.envSchema.parse(envVars);
      
      // Convert string values to appropriate types
      this.config = {
        enableRealTime: validatedConfig.VITE_ENABLE_REAL_TIME === 'true',
        enableNotifications: validatedConfig.VITE_ENABLE_NOTIFICATIONS === 'true',
        enableExports: validatedConfig.VITE_ENABLE_EXPORTS === 'true',
        enableAIFeatures: validatedConfig.VITE_ENABLE_AI_FEATURES === 'true',
        storageQuotaWarning: parseFloat(validatedConfig.VITE_STORAGE_QUOTA_WARNING),
        cacheDuration: parseInt(validatedConfig.VITE_CACHE_DURATION),
        updateInterval: parseInt(validatedConfig.VITE_UPDATE_INTERVAL),
        debugMode: validatedConfig.VITE_DEBUG_MODE === 'true',
        logLevel: validatedConfig.VITE_LOG_LEVEL,
        apiBaseUrl: validatedConfig.VITE_API_BASE_URL,
        analyticsId: validatedConfig.VITE_ANALYTICS_ID
      };

      this.isInitialized = true;
      console.log('✅ Configuration initialized successfully');
    } catch (error) {
      console.error('❌ Configuration validation failed:', error);
      this.loadDefaults();
    }
  }

  /**
   * Load default configuration
   */
  private static loadDefaults(): void {
    this.config = {
      enableRealTime: true,
      enableNotifications: true,
      enableExports: true,
      enableAIFeatures: true,
      storageQuotaWarning: 0.8,
      cacheDuration: 3600000,
      updateInterval: 2000,
      debugMode: false,
      logLevel: 'info',
      apiBaseUrl: undefined,
      analyticsId: undefined
    };
    this.isInitialized = true;
  }

  /**
   * Get configuration value with type safety
   */
  static get<T>(key: string, defaultValue?: T): T {
    if (!this.isInitialized) {
      this.initialize();
    }
    return this.config[key] !== undefined ? this.config[key] : defaultValue;
  }

  /**
   * Check if feature is enabled
   */
  static isFeatureEnabled(feature: string): boolean {
    return this.get(`enable${feature.charAt(0).toUpperCase() + feature.slice(1)}`, false);
  }

  /**
   * Validate API URL
   */
  static getSecureApiUrl(): string | null {
    const url = this.get<string>('apiBaseUrl');
    if (!url) return null;

    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.protocol === 'https:') {
        return url;
      }
      console.warn('⚠️ API URL is not using HTTPS, ignoring for security');
      return null;
    } catch {
      console.error('❌ Invalid API URL format');
      return null;
    }
  }
}
