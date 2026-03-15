import { createSlice } from "@reduxjs/toolkit";
import { githubFetchUsersReducer } from "@store/reducers/githubFetchUsersReducer";
import { GithubUsersFetchState } from "@store/types";
import { DEFAULT_PAGE_SIZE } from "shared";

const initialState: GithubUsersFetchState = {
  search: "",
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const githubUsersFetchSlice = createSlice({
  name: "githubUsersFetch",
  initialState,
  reducers: {
    fetchUsers: githubFetchUsersReducer,
  },
});

export const { fetchUsers } = githubUsersFetchSlice.actions;

export default githubUsersFetchSlice.reducer;
