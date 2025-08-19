import { GithubUsersRequest, GithubUsersResponse } from "shared";

const BASE_API_URL = "/api/github/users";

export const fetchGithubUsers = async ({
  pageSize,
  search = "",
  page = 1,
}: GithubUsersRequest): Promise<GithubUsersResponse> => {
  const params = new URLSearchParams();
  params.set("pageSize", pageSize.toString());
  params.set("page", page.toString());

  if (search) {
    params.set("search", search);
  }

  const queryString = `${BASE_API_URL}?${params.toString()}`;

  try {
    const response = await fetch(queryString, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Failed to get GitHub users from backend (${response.status}): ${errorBody}`
      );
    }
    const data = await response.json();

    return {
      items: data.items,
      total: data.total,
    };
  } catch (err) {
    console.error("fetchGithubUsers error:", err);
    throw new Error(
      err instanceof Error
        ? err.message
        : "An unknown error occurred while fetching github users from backend."
    );
  }
};
