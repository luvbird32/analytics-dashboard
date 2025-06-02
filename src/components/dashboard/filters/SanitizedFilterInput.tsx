
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useSanitizedInput } from '@/hooks/useSanitizedInput';
import { z } from 'zod';

interface SanitizedFilterInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  schema?: z.ZodSchema<string>;
}

/**
 * Enhanced sanitized input component with security warnings
 */
export const SanitizedFilterInput = ({
  label,
  value,
  onChange,
  placeholder,
  maxLength = 100,
  schema
}: SanitizedFilterInputProps) => {
  const {
    value: sanitizedValue,
    updateValue,
    isValid,
    errors,
    securityWarnings,
    hasSecurityWarnings
  } = useSanitizedInput(
    value,
    schema || z.string().max(maxLength).optional()
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    updateValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <Input
        id={label.toLowerCase()}
        value={sanitizedValue}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={!isValid || hasSecurityWarnings ? 'border-red-500' : ''}
      />
      
      {/* Security warnings */}
      {hasSecurityWarnings && (
        <Alert variant="destructive" className="mt-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Security Warning: {securityWarnings.join(', ')}
          </AlertDescription>
        </Alert>
      )}
      
      {/* Validation errors */}
      {errors.length > 0 && (
        <div className="text-sm text-red-600">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
};
