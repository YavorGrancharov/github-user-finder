export type GithubUser = {
  username: string;
  avatarUrl: string;
  publicReposCount: number;
  githubProfileUrl: string;
};

export type GithubApiUser = {
  login: string;
  avatar_url: string;
  html_url: string;
};

export type GithubUsersResponse = {
  total: number;
  items: GithubUser[];
};

export type GithubUsersApiResponse = {
  total_count: number;
  items: GithubApiUser[];
};

export type GithubUsersRequest = {
  pageSize: number;
  page: number;
  search?: string;
};

export type SimpleMessage = {
  message: string;
};
