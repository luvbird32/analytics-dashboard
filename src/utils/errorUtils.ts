
/**
 * Centralized error handling utilities
 * Provides consistent error processing across the application
 */
export class ErrorUtils {
  /**
   * Formats error messages for user display
   */
  static formatErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'An unexpected error occurred';
  }

  /**
   * Logs errors with context
   */
  static logError(context: string, error: unknown): void {
    console.error(`[${context}]`, error);
  }

  /**
   * Creates standardized error objects
   */
  static createError(message: string, code?: string): Error {
    const error = new Error(message);
    if (code) {
      (error as any).code = code;
    }
    return error;
  }

  /**
   * Handles chart-specific errors
   */
  static handleChartError(error: unknown, chartName: string): void {
    this.logError(`Chart: ${chartName}`, error);
  }
}

// Named export for convenience
export const errorUtils = ErrorUtils;
