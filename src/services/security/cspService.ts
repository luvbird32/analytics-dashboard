
/**
 * Content Security Policy service with enhanced security
 */
export class CSPService {
  private static nonce: string | null = null;

  /**
   * Generate a cryptographically secure nonce for CSP
   */
  static generateNonce(): string {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const array = new Uint8Array(16);
      window.crypto.getRandomValues(array);
      this.nonce = btoa(String.fromCharCode(...array));
      return this.nonce;
    }
    // Fallback for environments without crypto
    this.nonce = btoa(Math.random().toString(36).substring(2, 15));
    return this.nonce;
  }

  /**
   * Get current nonce
   */
  static getCurrentNonce(): string {
    return this.nonce || this.generateNonce();
  }

  /**
   * Enhanced CSP policies with stricter rules
   */
  static getStrictCSPPolicies(): Record<string, string> {
    const nonce = this.getCurrentNonce();
    
    return {
      'default-src': "'self'",
      'script-src': `'self' 'nonce-${nonce}' https://cdn.gpteng.co`,
      'style-src': `'self' 'nonce-${nonce}'`,
      'img-src': "'self' data: https:",
      'connect-src': "'self' https:",
      'font-src': "'self'",
      'object-src': "'none'",
      'base-uri': "'self'",
      'form-action': "'self'",
      'frame-ancestors': "'none'",
      'upgrade-insecure-requests': '',
      'block-all-mixed-content': ''
    };
  }

  /**
   * Apply CSP to document
   */
  static applyCSP(): void {
    if (typeof document === 'undefined') return;

    const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (existingCSP) {
      existingCSP.remove();
    }

    const meta = document.createElement('meta');
    meta.setAttribute('http-equiv', 'Content-Security-Policy');
    
    const policies = this.getStrictCSPPolicies();
    const cspContent = Object.entries(policies)
      .map(([directive, value]) => `${directive} ${value}`)
      .join('; ');
    
    meta.setAttribute('content', cspContent);
    document.head.appendChild(meta);
  }

  /**
   * Create a nonce-based style element
   */
  static createNonceStyle(css: string): HTMLStyleElement | null {
    if (typeof document === 'undefined') return null;

    const style = document.createElement('style');
    style.setAttribute('nonce', this.getCurrentNonce());
    style.textContent = css;
    return style;
  }
}
