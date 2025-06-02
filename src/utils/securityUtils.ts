
/**
 * Security utilities for input validation and sanitization
 */

/**
 * Sanitizes user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 1000); // Limit length
};

/**
 * Validates email format securely
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitizeInput(email));
};

/**
 * Sanitizes data before storing in localStorage/IndexedDB
 */
export const sanitizeStorageData = (data: any): any => {
  if (typeof data !== 'object' || data === null) return data;
  
  const sanitized = { ...data };
  
  // Remove sensitive fields
  delete sanitized.password;
  delete sanitized.apiKey;
  delete sanitized.token;
  delete sanitized.secret;
  
  // Sanitize string values
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key]);
    }
  });
  
  return sanitized;
};

/**
 * Secure error handler that doesn't expose sensitive information
 */
export const handleSecureError = (error: Error, context?: string): {
  message: string;
  code: string;
} => {
  // Log full error for debugging (server-side only in production)
  if (import.meta.env.DEV) {
    console.error(`Error in ${context}:`, error);
  }
  
  // Return sanitized error to user
  return {
    message: 'An error occurred. Please try again.',
    code: 'GENERIC_ERROR'
  };
};

/**
 * Validates URL to prevent open redirect vulnerabilities
 */
export const validateUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
};

/**
 * Rate limiting utility for client-side operations
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  isAllowed(key: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    
    const keyRequests = this.requests.get(key)!;
    
    // Remove old requests outside the window
    const validRequests = keyRequests.filter(time => time > windowStart);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return true;
  }
}

// Collection of security utilities
export const securityUtils = {
  sanitizeInput,
  validateEmail,
  sanitizeStorageData,
  handleSecureError,
  validateUrl,
  RateLimiter
};
