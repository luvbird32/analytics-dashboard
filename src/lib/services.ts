
/**
 * Standalone Services Export
 * 
 * This file exports service classes and utilities that can be used
 * independently for data generation and business logic.
 */

// Core Services
export { MetricsService } from '@/services/core/metricsService';
export { NotificationService } from '@/services/notificationService';

// Chart Services
export { BasicChartsService } from '@/services/charts/basicChartsService';
export { AdvancedChartsService } from '@/services/charts/advancedChartsService';
export { FinancialChartsService } from '@/services/charts/financialChartsService';

// Domain Services
export { CryptoService } from '@/services/crypto/cryptoService';
export { SocialMediaService } from '@/services/social/socialMediaService';
export { DetailedAnalyticsService } from '@/services/analytics/detailedAnalyticsService';

// Security Services
export { SanitizationService } from '@/services/security/sanitizationService';

// AI Services
export { DataProcessingService } from '@/services/ai/dataProcessingService';
