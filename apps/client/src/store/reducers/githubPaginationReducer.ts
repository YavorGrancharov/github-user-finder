import { PayloadAction } from "@reduxjs/toolkit";
import { GithubPaginationState } from "../types";

export const setCurrentPageReducer = (
  state: GithubPaginationState,
  action: PayloadAction<number>
) => {
  state.currentPage = action.payload;
};

export const resetCurrentPageReducer = (state: GithubPaginationState) => {
  state.currentPage = 1;
};
