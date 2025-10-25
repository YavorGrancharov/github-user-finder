import { createSlice } from "@reduxjs/toolkit";

export type GithubSearchState = {
  search: string;
};

const initialState: GithubSearchState = {
  search: "",
};

export const githubSearchSlice = createSlice({
  name: "githubSearch",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    resetSearch: (state) => {
      state.search = "";
    },
  },
});

export const { setSearch, resetSearch } = githubSearchSlice.actions;

export default githubSearchSlice.reducer;
