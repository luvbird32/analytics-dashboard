/**
 * Security monitoring and audit service
 */
export class SecurityMonitor {
  private static events: Array<{ timestamp: number; type: string; details: any }> = [];
  private static maxEvents = 1000;
  private static suspiciousActivityThreshold = 10;
  private static timeWindow = 5 * 60 * 1000; // 5 minutes

  /**
   * Log security event
   */
  static logSecurityEvent(type: string, details: any): void {
    const event = {
      timestamp: Date.now(),
      type,
      details: this.sanitizeEventDetails(details)
    };

    this.events.push(event);

    // Keep only recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Check for suspicious activity
    this.checkSuspiciousActivity(type);

    if (import.meta.env.DEV) {
      console.log('🔒 Security Event:', event);
    }
  }

  /**
   * Sanitize event details to prevent sensitive data logging
   */
  private static sanitizeEventDetails(details: any): any {
    if (typeof details !== 'object' || details === null) {
      return details;
    }

    const sanitized = { ...details };
    const sensitiveFields = ['password', 'token', 'key', 'secret', 'auth'];

    Object.keys(sanitized).forEach(key => {
      if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
        sanitized[key] = '[REDACTED]';
      }
    });

    return sanitized;
  }

  /**
   * Check for suspicious activity patterns
   */
  private static checkSuspiciousActivity(eventType: string): void {
    const now = Date.now();
    const recentEvents = this.events.filter(
      event => 
        event.timestamp > now - this.timeWindow && 
        event.type === eventType
    );

    if (recentEvents.length > this.suspiciousActivityThreshold) {
      this.logSecurityEvent('SUSPICIOUS_ACTIVITY_DETECTED', {
        eventType,
        count: recentEvents.length,
        timeWindow: this.timeWindow
      });

      // Trigger security response
      this.handleSuspiciousActivity(eventType, recentEvents.length);
    }
  }

  /**
   * Handle suspicious activity
   */
  private static handleSuspiciousActivity(eventType: string, count: number): void {
    console.warn(`🚨 Suspicious activity detected: ${eventType} (${count} events)`);
    
    // In a real application, you might:
    // - Rate limit the user
    // - Send alerts to administrators
    // - Temporarily block certain features
    // - Log to external monitoring service
  }

  /**
   * Get security events for analysis
   */
  static getSecurityEvents(type?: string, limit = 100): Array<any> {
    let filtered = this.events;
    
    if (type) {
      filtered = filtered.filter(event => event.type === type);
    }

    return filtered.slice(-limit);
  }

  /**
   * Clear old security events
   */
  static clearOldEvents(olderThan = 24 * 60 * 60 * 1000): void {
    const cutoff = Date.now() - olderThan;
    this.events = this.events.filter(event => event.timestamp > cutoff);
  }

  /**
   * Export security audit log
   */
  static exportAuditLog(): string {
    return JSON.stringify({
      exportTimestamp: Date.now(),
      events: this.events,
      summary: this.getSecuritySummary()
    }, null, 2);
  }

  /**
   * Get security summary
   */
  static getSecuritySummary(): any {
    const eventTypes = new Map<string, number>();
    
    this.events.forEach(event => {
      eventTypes.set(event.type, (eventTypes.get(event.type) || 0) + 1);
    });

    return {
      totalEvents: this.events.length,
      eventTypes: Object.fromEntries(eventTypes),
      timeRange: {
        oldest: this.events[0]?.timestamp,
        newest: this.events[this.events.length - 1]?.timestamp
      }
    };
  }
}
