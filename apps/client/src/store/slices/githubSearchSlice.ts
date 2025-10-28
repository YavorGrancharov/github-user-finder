import { createSlice } from "@reduxjs/toolkit";
import {
  resetSearchReducer,
  setSearchReducer,
} from "@store/reducers/githubSearchReducer";
import { GithubSearchState } from "@store/types";

const initialState: GithubSearchState = {
  search: "",
};

export const githubSearchSlice = createSlice({
  name: "githubSearch",
  initialState,
  reducers: {
    setSearch: setSearchReducer,
    resetSearch: resetSearchReducer,
  },
});

export const { setSearch, resetSearch } = githubSearchSlice.actions;

export default githubSearchSlice.reducer;
