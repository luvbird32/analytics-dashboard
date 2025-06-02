
import { useState, useCallback } from 'react';
import { SanitizationService } from '@/services/security/sanitizationService';
import { SecurityMonitor } from '@/services/security/securityMonitor';
import { z } from 'zod';

/**
 * Enhanced hook for handling sanitized user input with security monitoring
 */
export const useSanitizedInput = <T>(
  initialValue: T,
  schema?: z.ZodSchema<T>
) => {
  const [value, setValue] = useState<T>(initialValue);
  const [errors, setErrors] = useState<string[]>([]);
  const [securityWarnings, setSecurityWarnings] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(true);

  const updateValue = useCallback((newValue: T) => {
    try {
      if (schema) {
        const result = SanitizationService.validateFormData(
          newValue as any,
          schema
        );
        
        setIsValid(result.isValid);
        setErrors(result.errors);
        setSecurityWarnings(result.securityWarnings);
        setValue(result.sanitizedData);

        // Log security warnings if any
        if (result.securityWarnings.length > 0) {
          SecurityMonitor.logSecurityEvent('INPUT_SECURITY_WARNING', {
            warnings: result.securityWarnings,
            context: 'useSanitizedInput'
          });
        }
      } else {
        // Basic sanitization for strings with threat detection
        if (typeof newValue === 'string') {
          const threats = SanitizationService.detectMaliciousPatterns(newValue);
          
          if (!threats.isSafe) {
            SecurityMonitor.logSecurityEvent('INPUT_THREAT_DETECTED', {
              threats: threats.threats,
              context: 'useSanitizedInput'
            });
            setSecurityWarnings([`Potential security threats detected: ${threats.threats.join(', ')}`]);
          } else {
            setSecurityWarnings([]);
          }

          const sanitized = SanitizationService.sanitizeSearchQuery(newValue) as T;
          setValue(sanitized);
        } else {
          setValue(newValue);
          setSecurityWarnings([]);
        }
        
        setIsValid(true);
        setErrors([]);
      }
    } catch (error) {
      SecurityMonitor.logSecurityEvent('INPUT_SANITIZATION_ERROR', { error });
      setErrors(['Input processing failed']);
      setIsValid(false);
      setSecurityWarnings([]);
    }
  }, [schema]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setErrors([]);
    setSecurityWarnings([]);
    setIsValid(true);
  }, [initialValue]);

  return {
    value,
    updateValue,
    reset,
    isValid,
    errors,
    securityWarnings,
    hasErrors: errors.length > 0,
    hasSecurityWarnings: securityWarnings.length > 0
  };
};
