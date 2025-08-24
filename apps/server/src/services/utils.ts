import { GITHUB_API_TIMEOUT } from "./consts";

export const getRequestHeaders = () => ({
  "Content-Type": "application/json",
  "X-GitHub-Api-Version": "2022-11-28",
  Accept: "application/vnd.github.v3.text-match+json",
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  "User-Agent": "YavorGrancharov",
});

export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GITHUB_API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return response;
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
};

export const fetchWithRetry = async (
  url: string,
  maxRetries = 3,
  delay = 1000,
  options: RequestInit = {}
): Promise<Response> => {
  if (maxRetries < 1) {
    throw new Error("maxRetries must be at least 1");
  }

  if (delay <= 0) {
    throw new Error("delay must be positive for exponential backoff to work");
  }

  let attempt = 0;
  let currentDelay = delay;

  while (attempt < maxRetries) {
    try {
      const response = await fetchWithTimeout(url, {
        ...options,
        headers: getRequestHeaders(),
      });

      if (!response.ok) {
        const method = options.method ?? "GET";
        if (!shouldRetry(method, response.status)) {
          return response;
        }
        throw new Error(`Request failed with status ${response.status}`);
      }

      return response;
    } catch (err) {
      attempt++;
      if (attempt === maxRetries) {
        throw new Error("Max retries reached. Request failed.");
      }

      console.error(
        `Attempt ${attempt} failed. Retrying in ${currentDelay} ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= 2;
    }
  }

  throw new Error("Unexpected end of retry loop");
};

const shouldRetry = (method: string, status: number) => {
  const safeMethods = ["GET", "HEAD", "OPTIONS"];
  const retryStatuses = [429, 500, 502, 503, 504];

  return safeMethods.includes(method) && retryStatuses.includes(status);
};
