import { createAction } from "@reduxjs/toolkit";
import { GithubUsersResponse } from "shared";

export const prefetchUsersStart = createAction("github/prefetchUsersStart");

export const prefetchUsersSuccess = createAction<GithubUsersResponse>(
  "github/prefetchUsersSuccess"
);

export const prefetchUsersFailure = createAction<string>(
  "github/prefetchUsersFailure"
);
