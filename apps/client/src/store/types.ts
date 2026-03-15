import { Epic } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { GithubUser } from "shared";
import githubSearchReducer from "./slices/githubSearchSlice";
import githubPaginationReducer from "./slices/githubPaginationSlice";
import githubCacheReducer from "./slices/githubCacheSlice";
import githubUsersReducer, {
  githubUsersSlice,
} from "./slices/githubUsersSlice";
import {
  prefetchUsersFailure,
  prefetchUsersStart,
  prefetchUsersSuccess,
} from "./actions/prefetchUsersActions";
import { githubUsersFetchSlice } from "./slices/githubFetchUsersSlice";

export type RootState = {
  githubUsers: ReturnType<typeof githubUsersReducer>;
  githubSearch: ReturnType<typeof githubSearchReducer>;
  githubPagination: ReturnType<typeof githubPaginationReducer>;
  githubCache: ReturnType<typeof githubCacheReducer>;
};

export type AppEpic = Epic<PayloadAction<any>, PayloadAction<any>, RootState>;

export type AppActions =
  | ReturnType<typeof githubUsersFetchSlice.actions.fetchUsers>
  | ReturnType<typeof githubUsersSlice.actions.fetchUsersSuccess>
  | ReturnType<typeof githubUsersSlice.actions.fetchUsersError>
  | ReturnType<typeof githubUsersSlice.actions.clearResults>
  | ReturnType<typeof prefetchUsersStart>
  | ReturnType<typeof prefetchUsersSuccess>
  | ReturnType<typeof prefetchUsersFailure>;

export type GithubCacheState = {
  [key: string]: {
    items: GithubUser[];
    total: number;
  };
};

export type GithubUsersFetchState = {
  search: string;
  page: number;
  pageSize: number;
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
