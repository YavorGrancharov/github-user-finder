import pLimit from "p-limit";
import Opossum from "opossum";
import {
  GithubUsersRequest,
  GithubUsersResponse,
  GithubApiUser,
  GithubUsersApiResponse,
  GithubUser,
  DEFAULT_PAGE_SIZE,
  GITHUB_BASE_URL,
  USER_CONCURRENCY_LIMIT,
} from "shared";
import { redisCache } from "./redisCache";
import { fetchWithRetry } from "./utils";
import {
  CACHE_TTL_MS,
  CIRCUIT_BREAKER_OPTIONS,
  GITHUB_MAX_SEARCH_RESULTS,
} from "./consts";

const repoCache = new Map<string, { expires: number; data: GithubUser }>();
const circuitBreaker = new Opossum(fetchWithRetry, CIRCUIT_BREAKER_OPTIONS);

circuitBreaker.fallback(() => "Sorry, out of service right now");

const getGithubUserRepos = async (user: GithubApiUser): Promise<GithubUser> => {
  // const cacheKey = `${user.login}-repos`;
  const cacheKey = `github:user:${user.login}:repos`;

  const cachedData = await redisCache.get(cacheKey);

  if (cachedData) {
    console.log("Cache hit for:", user.login);
    return cachedData;
  }

  console.log("Cache miss for:", user.login);

  // const cache = repoCache.get(cacheKey);
  // if (cache && cache.expires > Date.now()) {
  //   return cache.data;
  // }

  const NEXT_PAGE_PATTERN = /<([^>]*)>; rel="next"/i;

  let allUserGithubRepos: Array<{ fork: boolean; private: boolean }> = [];

  const username = encodeURIComponent(user.login);
  let userGithubReposUrl = `${GITHUB_BASE_URL}/users/${username}/repos`;
  let hasNextPage = true;

  try {
    while (hasNextPage) {
      const userReposResponse = await circuitBreaker.fire(
        userGithubReposUrl,
        undefined,
        undefined,
        { method: "GET" }
      );

      if (!userReposResponse.ok) {
        const errorText = await userReposResponse.text();
        throw new Error(
          `GitHub API error: ${userReposResponse.status} - ${errorText}`
        );
      }

      const userRepos = (await userReposResponse.json()) as Array<{
        fork: boolean;
        private: boolean;
      }>;

      allUserGithubRepos = [...allUserGithubRepos, ...userRepos];

      const linkHeader = userReposResponse.headers.get("link");
      hasNextPage = linkHeader?.includes('rel="next"') ?? false;

      if (hasNextPage && linkHeader) {
        const nextPageResponse = linkHeader.match(NEXT_PAGE_PATTERN);
        if (nextPageResponse) {
          userGithubReposUrl = nextPageResponse[1];
        } else {
          hasNextPage = false;
        }
      }
    }

    const userPublicReposCount = allUserGithubRepos.reduce((count, repo) => {
      if (!repo.fork && !repo.private) {
        return count + 1;
      }
      return count;
    }, 0);

    const result: GithubUser = {
      id: user.id,
      username: user.login,
      avatarUrl: user.avatar_url,
      publicReposCount: userPublicReposCount,
      githubProfileUrl: user.html_url,
    };

    await redisCache.set(cacheKey, result);

    // repoCache.set(cacheKey, {
    //   expires: Date.now() + CACHE_TTL_MS,
    //   data: result,
    // });

    return result;
  } catch (err) {
    console.error(`Error fetching repos for ${user.login}:`, err);
    throw new Error(
      `Failed to fetch user repos: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
  }
};

export const getGithubUsersList = async (
  params: GithubUsersRequest
): Promise<GithubUsersResponse> => {
  const { search = "", page = 1 } = params;

  if (!search.trim()) {
    return {
      total: 0,
      items: [],
    };
  }

  const pageSize = Math.min(
    Math.max(params.pageSize ?? DEFAULT_PAGE_SIZE, 1),
    100
  );

  const searchUsersUrl = new URL("/search/users", GITHUB_BASE_URL);
  searchUsersUrl.searchParams.set("per_page", pageSize.toString());
  searchUsersUrl.searchParams.set("page", page.toString());
  searchUsersUrl.searchParams.set("q", `${search} type:user`);

  try {
    const githubSearchRequest = await circuitBreaker.fire(
      searchUsersUrl.toString(),
      undefined,
      undefined,
      { method: "GET" }
    );

    if (!githubSearchRequest.ok) {
      const errorBody = await githubSearchRequest.text();
      throw new Error(
        `GitHub users search failed (${githubSearchRequest.status}): ${errorBody}`
      );
    }

    const githubSearchResults: GithubUsersApiResponse =
      await githubSearchRequest.json();

    const userLimit = pLimit(USER_CONCURRENCY_LIMIT);

    const users = await Promise.all(
      githubSearchResults.items.map((user: GithubApiUser) =>
        userLimit(() => getGithubUserRepos(user))
      )
    );

    const limitedTotal = Math.min(
      githubSearchResults.total_count,
      GITHUB_MAX_SEARCH_RESULTS
    );

    return {
      total: limitedTotal,
      items: users,
    };
  } catch (err) {
    console.error("getGithubUsersList error:", err);
    throw new Error(
      `Failed to fetch GitHub users list: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
  }
};
