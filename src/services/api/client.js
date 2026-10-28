import { env } from '../../config/env';
import { ApiError } from './errorHandler';

const DEFAULT_TIMEOUT = 12000;

/**
 * Robust, lightweight API client with timeout and error mapping
 */
export async function apiClient(endpoint, options = {}) {
  const { timeout = DEFAULT_TIMEOUT, headers = {}, ...customConfig } = options;
  const url = `${env.apiBaseUrl}${endpoint}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const config = {
    method: customConfig.body ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    signal: controller.signal,
    ...customConfig,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      throw new ApiError(
        errorData.message || `Request failed with status ${response.status}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);

    // If backend is not currently deployed, simulate a realistic local response for demo/test mode
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      if (env.isDev) {
        console.warn(`[Info Drill API Client] Backend at ${url} not connected. Simulating client-side success response for development.`);
        await new Promise((resolve) => setTimeout(resolve, 800));
        return { success: true, simulated: true, timestamp: new Date().toISOString() };
      }
    }

    throw err;
  }
}
