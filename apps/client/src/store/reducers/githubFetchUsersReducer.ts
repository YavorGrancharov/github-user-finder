import { PayloadAction } from "@reduxjs/toolkit";
import { GithubUsersFetchState } from "../types";
import { GithubUsersRequest } from "shared";

export const githubFetchUsersReducer = (
  state: GithubUsersFetchState,
  action: PayloadAction<GithubUsersRequest>,
) => {
  state.search = action.payload.search || "";
  state.page = action.payload.page;
  state.pageSize = action.payload.pageSize;
};
