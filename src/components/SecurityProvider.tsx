
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { RateLimiter } from '@/utils/securityUtils';
import { useSecureStorage } from '@/hooks/useSecureStorage';

interface SecurityContextType {
  rateLimiter: RateLimiter;
  checkStorageQuota: () => Promise<{ usage: number; quota: number }>;
  enableCSP: () => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

interface SecurityProviderProps {
  children: ReactNode;
}

/**
 * Security provider component that implements security measures
 */
export const SecurityProvider = ({ children }: SecurityProviderProps) => {
  const { clearExpiredItems } = useSecureStorage();
  const rateLimiter = new RateLimiter();

  const checkStorageQuota = async (): Promise<{ usage: number; quota: number }> => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      const usage = estimate.usage || 0;
      const quota = estimate.quota || 0;
      
      // Warn if storage usage is high
      if (usage / quota > 0.8) {
        console.warn('Storage quota nearly exceeded. Consider clearing old data.');
      }
      
      return { usage, quota };
    }
    return { usage: 0, quota: 0 };
  };

  const enableCSP = () => {
    // Add CSP meta tag if not present
    if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
      const meta = document.createElement('meta');
      meta.setAttribute('http-equiv', 'Content-Security-Policy');
      meta.setAttribute('content', 
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://cdn.gpteng.co; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https:; " +
        "connect-src 'self' https:; " +
        "font-src 'self'; " +
        "object-src 'none'; " +
        "base-uri 'self';"
      );
      document.head.appendChild(meta);
    }
  };

  useEffect(() => {
    // Initialize security measures
    enableCSP();
    clearExpiredItems();
    checkStorageQuota();
    
    // Set up periodic cleanup
    const cleanup = setInterval(() => {
      clearExpiredItems();
      checkStorageQuota();
    }, 60 * 60 * 1000); // Every hour
    
    return () => clearInterval(cleanup);
  }, [clearExpiredItems]);

  const value: SecurityContextType = {
    rateLimiter,
    checkStorageQuota,
    enableCSP
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
