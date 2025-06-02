
import { SecurityMonitor } from './securityMonitor';
import { ConfigService } from './configService';

/**
 * Secure authentication service for dashboard access
 */
export class SecureAuthService {
  private static readonly SESSION_KEY = 'dashboard_session';
  private static readonly SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  private static isAuthenticated = false;
  private static sessionData: any = null;

  /**
   * Initialize authentication service
   */
  static initialize(): void {
    this.checkExistingSession();
    this.setupSessionMonitoring();
  }

  /**
   * Check for existing valid session
   */
  private static checkExistingSession(): void {
    try {
      const sessionStr = localStorage.getItem(this.SESSION_KEY);
      if (!sessionStr) return;

      const session = JSON.parse(sessionStr);
      if (this.isSessionValid(session)) {
        this.isAuthenticated = true;
        this.sessionData = session;
        SecurityMonitor.logSecurityEvent('SESSION_RESTORED', {
          userId: session.userId,
          lastActivity: session.lastActivity
        });
      } else {
        this.clearSession();
      }
    } catch (error) {
      SecurityMonitor.logSecurityEvent('SESSION_RESTORATION_FAILED', { error });
      this.clearSession();
    }
  }

  /**
   * Validate session
   */
  private static isSessionValid(session: any): boolean {
    if (!session || !session.timestamp || !session.lastActivity) {
      return false;
    }

    const now = Date.now();
    const sessionAge = now - session.timestamp;
    const lastActivity = now - session.lastActivity;

    return sessionAge < this.SESSION_TIMEOUT && lastActivity < this.SESSION_TIMEOUT;
  }

  /**
   * Setup session monitoring
   */
  private static setupSessionMonitoring(): void {
    // Monitor user activity
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    activityEvents.forEach(event => {
      document.addEventListener(event, () => {
        if (this.isAuthenticated) {
          this.updateLastActivity();
        }
      }, { passive: true });
    });

    // Check session validity periodically
    setInterval(() => {
      if (this.isAuthenticated && !this.isSessionValid(this.sessionData)) {
        this.logout('Session expired');
      }
    }, 60000); // Check every minute
  }

  /**
   * Update last activity timestamp
   */
  private static updateLastActivity(): void {
    if (this.sessionData) {
      this.sessionData.lastActivity = Date.now();
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(this.sessionData));
    }
  }

  /**
   * Authenticate user (mock implementation for dashboard demo)
   */
  static authenticate(credentials?: { username?: string; password?: string }): boolean {
    try {
      // For demo purposes, accept any credentials or no credentials
      // In production, this would validate against a backend
      
      const session = {
        userId: credentials?.username || 'demo-user',
        timestamp: Date.now(),
        lastActivity: Date.now(),
        permissions: ['dashboard:read', 'dashboard:export']
      };

      this.sessionData = session;
      this.isAuthenticated = true;
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));

      SecurityMonitor.logSecurityEvent('USER_AUTHENTICATED', {
        userId: session.userId,
        timestamp: session.timestamp
      });

      return true;
    } catch (error) {
      SecurityMonitor.logSecurityEvent('AUTHENTICATION_FAILED', { error });
      return false;
    }
  }

  /**
   * Logout user
   */
  static logout(reason = 'User logout'): void {
    if (this.sessionData) {
      SecurityMonitor.logSecurityEvent('USER_LOGOUT', {
        userId: this.sessionData.userId,
        reason
      });
    }

    this.clearSession();
  }

  /**
   * Clear session data
   */
  private static clearSession(): void {
    this.isAuthenticated = false;
    this.sessionData = null;
    localStorage.removeItem(this.SESSION_KEY);
  }

  /**
   * Check if user is authenticated
   */
  static isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Get current session data
   */
  static getSessionData(): any {
    return this.sessionData;
  }

  /**
   * Check user permissions
   */
  static hasPermission(permission: string): boolean {
    if (!this.isAuthenticated || !this.sessionData) {
      return false;
    }

    return this.sessionData.permissions?.includes(permission) || false;
  }

  /**
   * Require authentication
   */
  static requireAuth(): boolean {
    if (!this.isAuthenticated) {
      // For demo purposes, auto-authenticate
      return this.authenticate();
    }
    return true;
  }
}
