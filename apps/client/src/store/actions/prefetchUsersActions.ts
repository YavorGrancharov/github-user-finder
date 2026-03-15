import { createAction } from "@reduxjs/toolkit";
import { GithubUsersRequest, GithubUsersResponse } from "shared";

export const prefetchUsersStart = createAction<GithubUsersRequest>("github/prefetchUsersStart");

export const prefetchUsersSuccess = createAction<GithubUsersResponse>(
  "github/prefetchUsersSuccess"
);

export const prefetchUsersFailure = createAction<string>(
  "github/prefetchUsersFailure"
);
