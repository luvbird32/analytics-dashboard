
import { sanitizeInput, validateEmail, validateUrl } from '@/utils/securityUtils';
import { SecurityMonitor } from './securityMonitor';
import { z } from 'zod';

/**
 * Enhanced sanitization service with security monitoring
 */
export class SanitizationService {
  /**
   * Sanitize and validate dashboard filter inputs
   */
  static sanitizeDashboardFilters(filters: any): any {
    try {
      SecurityMonitor.logSecurityEvent('FILTER_SANITIZATION_STARTED', {
        filterKeys: Object.keys(filters || {})
      });

      const sanitizedFilters = { ...filters };
      
      // Sanitize string arrays with enhanced validation
      if (Array.isArray(sanitizedFilters.category)) {
        sanitizedFilters.category = sanitizedFilters.category
          .map((cat: string) => this.sanitizeAndValidateCategory(cat))
          .filter(Boolean);
      }
      
      if (Array.isArray(sanitizedFilters.region)) {
        sanitizedFilters.region = sanitizedFilters.region
          .map((region: string) => this.sanitizeAndValidateRegion(region))
          .filter(Boolean);
      }
      
      if (Array.isArray(sanitizedFilters.userType)) {
        sanitizedFilters.userType = sanitizedFilters.userType
          .map((type: string) => this.sanitizeAndValidateUserType(type))
          .filter(Boolean);
      }
      
      // Validate date range with security checks
      if (sanitizedFilters.dateRange && typeof sanitizedFilters.dateRange === 'string') {
        sanitizedFilters.dateRange = this.sanitizeAndValidateDateRange(sanitizedFilters.dateRange);
      }
      
      SecurityMonitor.logSecurityEvent('FILTER_SANITIZATION_COMPLETED', {
        originalKeys: Object.keys(filters || {}),
        sanitizedKeys: Object.keys(sanitizedFilters)
      });
      
      return sanitizedFilters;
    } catch (error) {
      SecurityMonitor.logSecurityEvent('FILTER_SANITIZATION_FAILED', { error });
      return {}; // Return empty filters on error for security
    }
  }

  /**
   * Enhanced chart data sanitization with XSS protection
   */
  static sanitizeChartData(data: any[]): any[] {
    try {
      SecurityMonitor.logSecurityEvent('CHART_DATA_SANITIZATION_STARTED', {
        dataLength: data.length
      });

      const sanitizedData = data.map(item => {
        const sanitizedItem = { ...item };
        
        // Sanitize all string properties with threat detection
        Object.keys(sanitizedItem).forEach(key => {
          if (typeof sanitizedItem[key] === 'string') {
            const original = sanitizedItem[key];
            sanitizedItem[key] = this.sanitizeWithThreatDetection(original, `chart.${key}`);
          }
        });
        
        return sanitizedItem;
      });

      SecurityMonitor.logSecurityEvent('CHART_DATA_SANITIZATION_COMPLETED', {
        originalLength: data.length,
        sanitizedLength: sanitizedData.length
      });
      
      return sanitizedData;
    } catch (error) {
      SecurityMonitor.logSecurityEvent('CHART_DATA_SANITIZATION_FAILED', { error });
      return []; // Return empty array on error for security
    }
  }

  /**
   * Enhanced notification sanitization
   */
  static sanitizeNotification(notification: any): any {
    try {
      const allowedTypes = ['info', 'warning', 'error', 'success'];
      
      const sanitized = {
        ...notification,
        title: this.sanitizeWithThreatDetection(notification.title || '', 'notification.title'),
        message: this.sanitizeWithThreatDetection(notification.message || '', 'notification.message'),
        type: allowedTypes.includes(notification.type) ? notification.type : 'info',
        timestamp: Date.now() // Always use server timestamp for security
      };

      SecurityMonitor.logSecurityEvent('NOTIFICATION_SANITIZED', {
        originalType: notification.type,
        sanitizedType: sanitized.type
      });

      return sanitized;
    } catch (error) {
      SecurityMonitor.logSecurityEvent('NOTIFICATION_SANITIZATION_FAILED', { error });
      return {
        title: 'System Notification',
        message: 'Content could not be displayed safely',
        type: 'info',
        timestamp: Date.now()
      };
    }
  }

  /**
   * Enhanced form data validation with security checks
   */
  static validateFormData(data: Record<string, any>, schema: z.ZodSchema): {
    isValid: boolean;
    sanitizedData: any;
    errors: string[];
    securityWarnings: string[];
  } {
    const errors: string[] = [];
    const securityWarnings: string[] = [];
    const sanitizedData: Record<string, any> = {};

    try {
      SecurityMonitor.logSecurityEvent('FORM_VALIDATION_STARTED', {
        fieldCount: Object.keys(data).length
      });

      // First sanitize and check for threats
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'string') {
          const sanitized = this.sanitizeWithThreatDetection(data[key], `form.${key}`);
          if (sanitized !== data[key]) {
            securityWarnings.push(`Potential threat detected in field: ${key}`);
          }
          sanitizedData[key] = sanitized;
        } else {
          sanitizedData[key] = data[key];
        }
      });

      // Then validate with schema
      const result = schema.safeParse(sanitizedData);
      
      if (!result.success) {
        result.error.errors.forEach(error => {
          errors.push(`${error.path.join('.')}: ${error.message}`);
        });
        
        SecurityMonitor.logSecurityEvent('FORM_VALIDATION_FAILED', {
          errors: errors.length,
          securityWarnings: securityWarnings.length
        });
        
        return { isValid: false, sanitizedData, errors, securityWarnings };
      }

      SecurityMonitor.logSecurityEvent('FORM_VALIDATION_COMPLETED', {
        isValid: true,
        securityWarnings: securityWarnings.length
      });

      return { isValid: true, sanitizedData: result.data, errors: [], securityWarnings };
    } catch (error) {
      SecurityMonitor.logSecurityEvent('FORM_VALIDATION_ERROR', { error });
      errors.push('Validation error occurred');
      return { isValid: false, sanitizedData, errors, securityWarnings };
    }
  }

  /**
   * Sanitize with threat detection
   */
  private static sanitizeWithThreatDetection(input: string, context: string): string {
    const threats = this.detectMaliciousPatterns(input);
    
    if (!threats.isSafe) {
      SecurityMonitor.logSecurityEvent('SECURITY_THREAT_DETECTED', {
        context,
        threats: threats.threats,
        input: input.substring(0, 100) // Log only first 100 chars for analysis
      });
    }

    return sanitizeInput(input);
  }

  /**
   * Enhanced malicious pattern detection
   */
  static detectMaliciousPatterns(input: string): {
    isSafe: boolean;
    threats: string[];
  } {
    const threats: string[] = [];
    const patterns = [
      { pattern: /<script[\s\S]*?>[\s\S]*?<\/script>/gi, threat: 'Script injection' },
      { pattern: /javascript\s*:/gi, threat: 'JavaScript protocol' },
      { pattern: /on\w+\s*=/gi, threat: 'Event handler injection' },
      { pattern: /eval\s*\(/gi, threat: 'Code evaluation attempt' },
      { pattern: /document\s*\./gi, threat: 'DOM manipulation attempt' },
      { pattern: /window\s*\./gi, threat: 'Window object access' },
      { pattern: /innerHTML\s*=/gi, threat: 'innerHTML manipulation' },
      { pattern: /outerHTML\s*=/gi, threat: 'outerHTML manipulation' },
      { pattern: /<iframe[\s\S]*?>/gi, threat: 'Iframe injection' },
      { pattern: /<object[\s\S]*?>/gi, threat: 'Object tag injection' },
      { pattern: /<embed[\s\S]*?>/gi, threat: 'Embed tag injection' },
      { pattern: /data\s*:\s*text\/html/gi, threat: 'Data URL HTML injection' },
      { pattern: /vbscript\s*:/gi, threat: 'VBScript protocol' },
      { pattern: /expression\s*\(/gi, threat: 'CSS expression injection' }
    ];

    patterns.forEach(({ pattern, threat }) => {
      if (pattern.test(input)) {
        threats.push(threat);
      }
    });

    return {
      isSafe: threats.length === 0,
      threats
    };
  }

  // Private helper methods for specific sanitization
  private static sanitizeAndValidateCategory(category: string): string | null {
    const sanitized = sanitizeInput(category).toLowerCase();
    const validCategories = ['technology', 'finance', 'healthcare', 'education', 'retail', 'entertainment'];
    return validCategories.includes(sanitized) ? sanitized : null;
  }

  private static sanitizeAndValidateRegion(region: string): string | null {
    const sanitized = sanitizeInput(region).toLowerCase();
    const validRegions = ['north-america', 'europe', 'asia-pacific', 'latin-america', 'africa', 'middle-east'];
    return validRegions.includes(sanitized) ? sanitized : null;
  }

  private static sanitizeAndValidateUserType(userType: string): string | null {
    const sanitized = sanitizeInput(userType).toLowerCase();
    const validUserTypes = ['free', 'premium', 'enterprise', 'trial'];
    return validUserTypes.includes(sanitized) ? sanitized : null;
  }

  private static sanitizeAndValidateDateRange(dateRange: string): string {
    const sanitized = sanitizeInput(dateRange);
    const allowedRanges = ['today', '7d', '30d', '90d', 'custom'];
    return allowedRanges.includes(sanitized) ? sanitized : 'today';
  }

  /**
   * Enhanced search query sanitization
   */
  static sanitizeSearchQuery(query: string): string {
    try {
      const threats = this.detectMaliciousPatterns(query);
      
      if (!threats.isSafe) {
        SecurityMonitor.logSecurityEvent('SEARCH_QUERY_THREAT_DETECTED', {
          threats: threats.threats,
          queryLength: query.length
        });
      }

      return sanitizeInput(query)
        .replace(/[<>(){}[\]]/g, '') // Remove additional dangerous characters
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim()
        .slice(0, 100); // Limit length
    } catch (error) {
      SecurityMonitor.logSecurityEvent('SEARCH_QUERY_SANITIZATION_FAILED', { error });
      return '';
    }
  }

  /**
   * Enhanced file name sanitization
   */
  static sanitizeFileName(fileName: string): string {
    try {
      const sanitized = sanitizeInput(fileName)
        .replace(/[^a-zA-Z0-9\-_\.]/g, '_') // Only allow safe characters
        .replace(/_{2,}/g, '_') // Replace multiple underscores
        .replace(/^\.+/, '') // Remove leading dots
        .slice(0, 100); // Limit length

      SecurityMonitor.logSecurityEvent('FILENAME_SANITIZED', {
        original: fileName.substring(0, 50),
        sanitized: sanitized.substring(0, 50)
      });

      return sanitized || 'download'; // Provide fallback
    } catch (error) {
      SecurityMonitor.logSecurityEvent('FILENAME_SANITIZATION_FAILED', { error });
      return 'download';
    }
  }
}
