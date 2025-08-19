import pLimit from "p-limit";
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
import {
  CACHE_TTL_MS,
  fetchWithTimeout,
  getRequestHeaders,
  repoCache,
} from "./utils";

const getGithubUserRepos = async (user: GithubApiUser): Promise<GithubUser> => {
  const cacheKey = `${user.login}-repos`;

  const cache = repoCache.get(cacheKey);
  if (cache && cache.expires > Date.now()) {
    return cache.data;
  }

  const NEXT_PAGE_PATTERN = /<([^>]*)>; rel="next"/i;

  let allUserGithubRepos: Array<{ fork: boolean; private: boolean }> = [];

  const username = encodeURIComponent(user.login);
  let userGithubReposUrl = `${GITHUB_BASE_URL}/users/${username}/repos`;
  let hasNextPage = true;

  try {
    while (hasNextPage) {
      const userReposResponse = await fetchWithTimeout(userGithubReposUrl, {
        headers: getRequestHeaders(),
      });

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

    const result = {
      username: user.login,
      avatarUrl: user.avatar_url,
      publicReposCount: userPublicReposCount,
      githubProfileUrl: user.html_url,
    };

    repoCache.set(cacheKey, {
      expires: Date.now() + CACHE_TTL_MS,
      data: result,
    });

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
    30
  );

  const searchUsersUrl = new URL("/search/users", GITHUB_BASE_URL);
  searchUsersUrl.searchParams.set("per_page", pageSize.toString());
  searchUsersUrl.searchParams.set("page", page.toString());
  searchUsersUrl.searchParams.set("q", `${search} type:user`);

  try {
    const githubSearchRequest = await fetchWithTimeout(
      searchUsersUrl.toString(),
      {
        headers: getRequestHeaders(),
      }
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

    return {
      total: githubSearchResults.total_count,
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
