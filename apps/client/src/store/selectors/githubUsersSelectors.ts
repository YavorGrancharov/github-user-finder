import { RootState } from "@store/types";
import { DEFAULT_PAGE_SIZE } from "shared";

export const searchUsersSelector = (state: RootState) =>
  state.githubSearch.search;

export const currentPageSelector = (state: RootState) =>
  state.githubPagination.currentPage;

export const githubUsersSelector = (state: RootState) =>
  state.githubUsers.items;

export const githubUsersTotalSelector = (state: RootState) =>
  state.githubUsers.total;

export const githubUsersErrorSelector = (state: RootState) =>
  state.githubUsers.error;

export const githubUsersLoadingSelector = (state: RootState) =>
  state.githubUsers.isLoading;

export const githubCacheSelector = (state: RootState) => state.githubCache;

export const shouldFetchUsersSelector = (state: RootState) => {
  const search = state.githubSearch.search.trim();
  const currentPage = state.githubPagination.currentPage;

  const cacheKey = `github:users:${search}:${currentPage}:${DEFAULT_PAGE_SIZE}`;
  const cachedData = state.githubCache[cacheKey];

  return search.length > 0 && !cachedData;
};
