
import { sanitizeInput, validateEmail, validateUrl } from '@/utils/securityUtils';
import { z } from 'zod';

/**
 * Comprehensive sanitization service for all user inputs
 * Provides validation, sanitization, and security checks
 */
export class SanitizationService {
  /**
   * Sanitize and validate dashboard filter inputs
   */
  static sanitizeDashboardFilters(filters: any): any {
    const sanitizedFilters = { ...filters };
    
    // Sanitize string arrays
    if (Array.isArray(sanitizedFilters.category)) {
      sanitizedFilters.category = sanitizedFilters.category.map((cat: string) => 
        sanitizeInput(cat).toLowerCase()
      );
    }
    
    if (Array.isArray(sanitizedFilters.region)) {
      sanitizedFilters.region = sanitizedFilters.region.map((region: string) => 
        sanitizeInput(region).toLowerCase()
      );
    }
    
    if (Array.isArray(sanitizedFilters.userType)) {
      sanitizedFilters.userType = sanitizedFilters.userType.map((type: string) => 
        sanitizeInput(type).toLowerCase()
      );
    }
    
    // Validate date range
    if (sanitizedFilters.dateRange && typeof sanitizedFilters.dateRange === 'string') {
      const allowedRanges = ['today', '7d', '30d', '90d', 'custom'];
      if (!allowedRanges.includes(sanitizedFilters.dateRange)) {
        sanitizedFilters.dateRange = 'today';
      }
    }
    
    return sanitizedFilters;
  }

  /**
   * Sanitize chart data to prevent XSS in labels and tooltips
   */
  static sanitizeChartData(data: any[]): any[] {
    return data.map(item => {
      const sanitizedItem = { ...item };
      
      // Sanitize all string properties
      Object.keys(sanitizedItem).forEach(key => {
        if (typeof sanitizedItem[key] === 'string') {
          sanitizedItem[key] = sanitizeInput(sanitizedItem[key]);
        }
      });
      
      return sanitizedItem;
    });
  }

  /**
   * Sanitize notification content
   */
  static sanitizeNotification(notification: any): any {
    return {
      ...notification,
      title: sanitizeInput(notification.title || ''),
      message: sanitizeInput(notification.message || ''),
      type: ['info', 'warning', 'error', 'success'].includes(notification.type) 
        ? notification.type 
        : 'info'
    };
  }

  /**
   * Validate and sanitize form data
   */
  static validateFormData(data: Record<string, any>, schema: z.ZodSchema): {
    isValid: boolean;
    sanitizedData: any;
    errors: string[];
  } {
    const errors: string[] = [];
    const sanitizedData: Record<string, any> = {};

    try {
      // First sanitize string inputs
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'string') {
          sanitizedData[key] = sanitizeInput(data[key]);
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
        return { isValid: false, sanitizedData, errors };
      }

      return { isValid: true, sanitizedData: result.data, errors: [] };
    } catch (error) {
      errors.push('Validation error occurred');
      return { isValid: false, sanitizedData, errors };
    }
  }

  /**
   * Sanitize search queries
   */
  static sanitizeSearchQuery(query: string): string {
    return sanitizeInput(query)
      .replace(/[<>(){}[\]]/g, '') // Remove additional dangerous characters
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()
      .slice(0, 100); // Limit length
  }

  /**
   * Sanitize export file names
   */
  static sanitizeFileName(fileName: string): string {
    return sanitizeInput(fileName)
      .replace(/[^a-zA-Z0-9\-_\.]/g, '_') // Only allow safe characters
      .replace(/_{2,}/g, '_') // Replace multiple underscores
      .slice(0, 100); // Limit length
  }

  /**
   * Check for potential malicious patterns
   */
  static detectMaliciousPatterns(input: string): {
    isSafe: boolean;
    threats: string[];
  } {
    const threats: string[] = [];
    const patterns = [
      { pattern: /<script/i, threat: 'Script injection' },
      { pattern: /javascript:/i, threat: 'JavaScript protocol' },
      { pattern: /on\w+\s*=/i, threat: 'Event handler' },
      { pattern: /eval\s*\(/i, threat: 'Code evaluation' },
      { pattern: /document\./i, threat: 'DOM manipulation' },
      { pattern: /window\./i, threat: 'Window object access' }
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
}
