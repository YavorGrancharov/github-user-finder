export const GITHUB_API_TIMEOUT = 20000;
export const GITHUB_MAX_SEARCH_RESULTS = 1000;
export const CACHE_TTL_MS = 5 * 60 * 1000;
export const CIRCUIT_BREAKER_OPTIONS = {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000,
};
