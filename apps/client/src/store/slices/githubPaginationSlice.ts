import { createSlice } from "@reduxjs/toolkit";

export type GithubPaginationState = {
  currentPage: number;
};

const initialState: GithubPaginationState = {
  currentPage: 1,
};

export const githubPaginationSlice = createSlice({
  name: "githubPagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetCurrentPage: (state) => {
      state.currentPage = 1;
    },
  },
});

export const { setCurrentPage, resetCurrentPage } =
  githubPaginationSlice.actions;

export default githubPaginationSlice.reducer;
