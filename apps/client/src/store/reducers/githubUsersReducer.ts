import { PayloadAction } from "@reduxjs/toolkit";
import { GithubUsersState } from "../types";
import { GithubUser } from "shared";

export const fetchUsersStartReducer = (state: GithubUsersState) => {
  state.isLoading = true;
  state.error = null;
};

export const fetchUsersSuccessReducer = (
  state: GithubUsersState,
  action: PayloadAction<{ items: GithubUser[]; total: number }>
) => {
  state.items = action.payload.items;
  state.total = action.payload.total;
  state.isLoading = false;
};

export const fetchUsersErrorReducer = (
  state: GithubUsersState,
  action: PayloadAction<string>
) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const clearResultsReducer = (state: GithubUsersState) => {
  state.items = [];
  state.total = 0;
};
