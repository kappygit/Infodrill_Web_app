import { env } from '../../config/env';

/**
 * Standardized API Error Handler
 */
export class ApiError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export function handleApiError(error) {
  if (env.isDev) {
    console.error('[API Error]:', error);
  }

  if (error instanceof ApiError) {
    return error.message;
  }

  if (error.name === 'AbortError') {
    return 'The request timed out. Please try again.';
  }

  if (!navigator.onLine) {
    return 'Network unavailable. Please check your internet connection.';
  }

  return 'An unexpected issue occurred. Please try again or reach out directly to contact@infodrill.com.';
}
