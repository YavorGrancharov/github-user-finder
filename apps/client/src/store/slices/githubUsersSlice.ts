import { createSlice } from "@reduxjs/toolkit";
import { GithubUser } from "shared";

export type GithubUsersState = {
  search: string;
  currentPage: number;
  items: GithubUser[];
  total: number;
};

const initialState: GithubUsersState = {
  search: "",
  currentPage: 1,
  items: [],
  total: 0,
};

export const githubUsersSlice = createSlice({
  name: "githubUsers",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetSearch: (state) => {
      state.search = "";
      state.currentPage = 1;
    },
    setGithubUsers: (state, action) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    clearResults: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {
  setSearch,
  resetSearch,
  setCurrentPage,
  setGithubUsers,
  clearResults,
} = githubUsersSlice.actions;

export default githubUsersSlice.reducer;
