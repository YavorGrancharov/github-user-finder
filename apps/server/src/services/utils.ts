import { GithubUser } from "shared";

export const getRequestHeaders = () => ({
  "Content-Type": "application/json",
  "X-GitHub-Api-Version": "2022-11-28",
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  "User-Agent": "YavorGrancharov",
});

export const CACHE_TTL_MS = 5 * 60 * 1000;
export const repoCache = new Map<
  string,
  { expires: number; data: GithubUser }
>();

const GITHUB_API_TIMEOUT = 20000;

export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {}
) => {
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
