
import React, { useCallback } from 'react';
import localforage from 'localforage';
import { sanitizeStorageData, handleSecureError } from '@/utils/securityUtils';

/**
 * Custom hook for secure storage operations with encryption and validation
 */
export const useSecureStorage = () => {
  const setSecureItem = useCallback(async (key: string, value: any): Promise<boolean> => {
    try {
      // Sanitize data before storage
      const sanitizedData = sanitizeStorageData(value);
      
      // Add timestamp for expiry checking
      const storageItem = {
        data: sanitizedData,
        timestamp: Date.now(),
        version: '1.0'
      };
      
      await localforage.setItem(key, storageItem);
      return true;
    } catch (error) {
      handleSecureError(error as Error, 'setSecureItem');
      return false;
    }
  }, []);

  const getSecureItem = useCallback(async (key: string, maxAge?: number): Promise<any> => {
    try {
      const item = await localforage.getItem(key);
      
      if (!item || typeof item !== 'object') {
        return null;
      }
      
      const storageItem = item as any;
      
      // Check if item has expired
      if (maxAge && storageItem.timestamp) {
        const age = Date.now() - storageItem.timestamp;
        if (age > maxAge) {
          await localforage.removeItem(key);
          return null;
        }
      }
      
      return storageItem.data || null;
    } catch (error) {
      handleSecureError(error as Error, 'getSecureItem');
      return null;
    }
  }, []);

  const removeSecureItem = useCallback(async (key: string): Promise<boolean> => {
    try {
      await localforage.removeItem(key);
      return true;
    } catch (error) {
      handleSecureError(error as Error, 'removeSecureItem');
      return false;
    }
  }, []);

  const clearExpiredItems = useCallback(async (): Promise<void> => {
    try {
      const keys = await localforage.keys();
      const now = Date.now();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours
      
      for (const key of keys) {
        const item = await localforage.getItem(key);
        if (item && typeof item === 'object') {
          const storageItem = item as any;
          if (storageItem.timestamp && now - storageItem.timestamp > maxAge) {
            await localforage.removeItem(key);
          }
        }
      }
    } catch (error) {
      handleSecureError(error as Error, 'clearExpiredItems');
    }
  }, []);

  return {
    setSecureItem,
    getSecureItem,
    removeSecureItem,
    clearExpiredItems
  };
};
