import { Epic } from "redux-observable";
import { UnknownAction } from "@reduxjs/toolkit";
import { GithubUser } from "shared";
import { RootState } from "./store";

export type AppEpic = Epic<UnknownAction, UnknownAction, RootState>;

export type GithubCacheState = {
  [key: string]: {
    items: GithubUser[];
    total: number;
  };
};

export type GithubUsersState = {
  items: GithubUser[];
  total: number;
  isLoading: boolean;
  error: string | null;
};

export type GithubPaginationState = {
  currentPage: number;
};

export type GithubSearchState = {
  search: string;
};
