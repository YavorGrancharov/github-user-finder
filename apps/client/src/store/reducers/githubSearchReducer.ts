import { PayloadAction } from "@reduxjs/toolkit";
import { GithubSearchState } from "../types";

export const setSearchReducer = (
  state: GithubSearchState,
  action: PayloadAction<string>
) => {
  state.search = action.payload;
};

export const resetSearchReducer = (state: GithubSearchState) => {
  state.search = "";
};
