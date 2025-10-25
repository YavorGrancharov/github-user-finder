import { RootState } from "../store";

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
