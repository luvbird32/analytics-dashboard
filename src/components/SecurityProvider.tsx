
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { RateLimiter } from '@/utils/securityUtils';
import { useSecureStorage } from '@/hooks/useSecureStorage';
import { CSPService } from '@/services/security/cspService';
import { ConfigService } from '@/services/security/configService';
import { SecurityMonitor } from '@/services/security/securityMonitor';
import { SecureAuthService } from '@/services/security/secureAuthService';

interface SecurityContextType {
  rateLimiter: RateLimiter;
  checkStorageQuota: () => Promise<{ usage: number; quota: number }>;
  enableCSP: () => void;
  isAuthenticated: boolean;
  requireAuth: () => boolean;
  logout: (reason?: string) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

interface SecurityProviderProps {
  children: ReactNode;
}

/**
 * Enhanced security provider with comprehensive security measures
 */
export const SecurityProvider = ({ children }: SecurityProviderProps) => {
  const { clearExpiredItems } = useSecureStorage();
  const rateLimiter = new RateLimiter();

  const checkStorageQuota = async (): Promise<{ usage: number; quota: number }> => {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        const usage = estimate.usage || 0;
        const quota = estimate.quota || 0;
        
        // Log storage monitoring
        SecurityMonitor.logSecurityEvent('STORAGE_QUOTA_CHECK', {
          usage,
          quota,
          usagePercentage: quota > 0 ? (usage / quota) * 100 : 0
        });
        
        // Warn if storage usage is high
        const warningThreshold = ConfigService.get('storageQuotaWarning', 0.8);
        if (usage / quota > warningThreshold) {
          console.warn('Storage quota nearly exceeded. Consider clearing old data.');
          SecurityMonitor.logSecurityEvent('STORAGE_QUOTA_WARNING', {
            usage,
            quota,
            threshold: warningThreshold
          });
        }
        
        return { usage, quota };
      }
      return { usage: 0, quota: 0 };
    } catch (error) {
      SecurityMonitor.logSecurityEvent('STORAGE_QUOTA_CHECK_FAILED', { error });
      return { usage: 0, quota: 0 };
    }
  };

  const enableCSP = () => {
    try {
      CSPService.applyCSP();
      SecurityMonitor.logSecurityEvent('CSP_APPLIED', {
        timestamp: Date.now()
      });
    } catch (error) {
      SecurityMonitor.logSecurityEvent('CSP_APPLICATION_FAILED', { error });
    }
  };

  const requireAuth = (): boolean => {
    return SecureAuthService.requireAuth();
  };

  const logout = (reason?: string): void => {
    SecureAuthService.logout(reason);
  };

  useEffect(() => {
    try {
      // Initialize security services
      ConfigService.initialize();
      SecureAuthService.initialize();
      
      // Apply security measures
      enableCSP();
      
      // Setup security monitoring
      SecurityMonitor.logSecurityEvent('SECURITY_PROVIDER_INITIALIZED', {
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      });
      
      // Clear expired items
      clearExpiredItems();
      checkStorageQuota();
      
      // Set up periodic security tasks
      const securityInterval = setInterval(() => {
        clearExpiredItems();
        checkStorageQuota();
        SecurityMonitor.clearOldEvents();
      }, 60 * 60 * 1000); // Every hour

      // Monitor for potential security threats
      const threatMonitoringInterval = setInterval(() => {
        // Check for suspicious DOM manipulation
        const scripts = document.querySelectorAll('script:not([nonce])');
        if (scripts.length > 0) {
          SecurityMonitor.logSecurityEvent('SUSPICIOUS_SCRIPT_DETECTED', {
            count: scripts.length
          });
        }
      }, 5 * 60 * 1000); // Every 5 minutes
      
      return () => {
        clearInterval(securityInterval);
        clearInterval(threatMonitoringInterval);
      };
    } catch (error) {
      SecurityMonitor.logSecurityEvent('SECURITY_PROVIDER_INITIALIZATION_FAILED', { error });
      console.error('Security Provider initialization failed:', error);
    }
  }, [clearExpiredItems]);

  const value: SecurityContextType = {
    rateLimiter,
    checkStorageQuota,
    enableCSP,
    isAuthenticated: SecureAuthService.isUserAuthenticated(),
    requireAuth,
    logout
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

/**
 * Hook to use security context
 */
export const useSecurity = (): SecurityContextType => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
