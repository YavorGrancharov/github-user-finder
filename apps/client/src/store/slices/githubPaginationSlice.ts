import { createSlice } from "@reduxjs/toolkit";
import {
  resetCurrentPageReducer,
  setCurrentPageReducer,
} from "@store/reducers/githubPaginationReducer";
import { GithubPaginationState } from "@store/types";

const initialState: GithubPaginationState = {
  currentPage: 1,
};

export const githubPaginationSlice = createSlice({
  name: "githubPagination",
  initialState,
  reducers: {
    setCurrentPage: setCurrentPageReducer,
    resetCurrentPage: resetCurrentPageReducer,
  },
});

export const { setCurrentPage, resetCurrentPage } =
  githubPaginationSlice.actions;

export default githubPaginationSlice.reducer;
