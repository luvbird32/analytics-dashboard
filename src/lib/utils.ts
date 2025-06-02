
/**
 * Standalone Utilities Export
 * 
 * This file exports utility functions and classes that can be used
 * independently for common dashboard operations.
 */

// Filter Utilities
export { FilterUtils } from '@/utils/filterUtils';

// Performance Utilities
export { chartMemoization } from '@/utils/chartMemoization';

// Error Handling
export { errorUtils, ErrorUtils } from '@/utils/errorUtils';

// Security Utilities
export { securityUtils } from '@/utils/securityUtils';
export { xssProtection } from '@/utils/xssProtection';

// Common utility function for combining classes
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
