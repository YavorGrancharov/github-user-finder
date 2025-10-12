import { RootState } from "../store";

export const searchUsersSelector = (state: RootState) =>
  state.githubUsersResult.search;

export const currentPageSelector = (state: RootState) =>
  state.githubUsersResult.currentPage;

export const githubUsersSelector = (state: RootState) =>
  state.githubUsersResult.items;

export const githubUsersTotalSelector = (state: RootState) =>
  state.githubUsersResult.total;
