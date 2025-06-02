
import { useState, useCallback } from 'react';
import { SanitizationService } from '@/services/security/sanitizationService';
import { z } from 'zod';

/**
 * Hook for handling sanitized user input with validation
 */
export const useSanitizedInput = <T>(
  initialValue: T,
  schema?: z.ZodSchema<T>
) => {
  const [value, setValue] = useState<T>(initialValue);
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(true);

  const updateValue = useCallback((newValue: T) => {
    if (schema) {
      const result = SanitizationService.validateFormData(
        newValue as any,
        schema
      );
      
      setIsValid(result.isValid);
      setErrors(result.errors);
      setValue(result.sanitizedData);
    } else {
      // Basic sanitization for strings
      if (typeof newValue === 'string') {
        const sanitized = SanitizationService.sanitizeSearchQuery(newValue) as T;
        setValue(sanitized);
      } else {
        setValue(newValue);
      }
      setIsValid(true);
      setErrors([]);
    }
  }, [schema]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setErrors([]);
    setIsValid(true);
  }, [initialValue]);

  return {
    value,
    updateValue,
    reset,
    isValid,
    errors,
    hasErrors: errors.length > 0
  };
};
