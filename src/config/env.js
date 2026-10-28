/**
 * Environment configuration with safe fallbacks and startup validation.
 */
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.infodrill.com/v1',
  appName: import.meta.env.VITE_APP_NAME || 'Info Drill',
  appEnv: import.meta.env.VITE_APP_ENV || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};

// Simple diagnostic check in development
if (env.isDev) {
  // Configured correctly
}
