import { RootState } from "../store";

export const searchUsersSelector = (state: RootState) =>
  state.githubUsers.search;

export const currentPageSelector = (state: RootState) =>
  state.githubUsers.currentPage;

export const githubUsersSelector = (state: RootState) =>
  state.githubUsers.items;

export const githubUsersTotalSelector = (state: RootState) =>
  state.githubUsers.total;
