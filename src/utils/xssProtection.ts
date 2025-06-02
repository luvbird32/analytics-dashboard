
/**
 * XSS Protection utilities for React components
 */

/**
 * Safely render HTML content by escaping dangerous characters
 */
export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

/**
 * Create a safe innerHTML prop with sanitized content
 */
export const createSafeInnerHTML = (content: string) => {
  return {
    __html: escapeHtml(content)
  };
};

/**
 * Sanitize URL to prevent javascript: protocols
 */
export const sanitizeUrl = (url: string): string => {
  if (!url) return '';
  
  // Remove javascript: protocols and other dangerous schemes
  const dangerousProtocols = [
    'javascript:',
    'vbscript:',
    'data:',
    'file:'
  ];
  
  const lowerUrl = url.toLowerCase().trim();
  
  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return '#';
    }
  }
  
  return url;
};

/**
 * Validate that a string is safe for use in attributes
 */
export const isSafeAttribute = (value: string): boolean => {
  const dangerousPatterns = [
    /javascript:/i,
    /vbscript:/i,
    /on\w+\s*=/i,
    /<script/i,
    /expression\s*\(/i
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(value));
};

/**
 * Content Security Policy helper
 */
export const CSP_POLICIES = {
  DEFAULT: "default-src 'self'",
  SCRIPTS: "script-src 'self' 'unsafe-inline' https://cdn.gpteng.co",
  STYLES: "style-src 'self' 'unsafe-inline'",
  IMAGES: "img-src 'self' data: https:",
  CONNECT: "connect-src 'self' https:",
  FONTS: "font-src 'self'",
  OBJECTS: "object-src 'none'",
  BASE: "base-uri 'self'"
};

// Collection of XSS protection utilities
export const xssProtection = {
  escapeHtml,
  createSafeInnerHTML,
  sanitizeUrl,
  isSafeAttribute,
  CSP_POLICIES
};
