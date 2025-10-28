import { createSlice } from "@reduxjs/toolkit";
import {
  clearResultsReducer,
  fetchUsersErrorReducer,
  fetchUsersStartReducer,
  fetchUsersSuccessReducer,
} from "@store/reducers/githubUsersReducer";
import { GithubUsersState } from "@store/types";

const initialState: GithubUsersState = {
  items: [],
  total: 0,
  isLoading: false,
  error: null,
};

export const githubUsersSlice = createSlice({
  name: "githubUsers",
  initialState,
  reducers: {
    fetchUsersStart: fetchUsersStartReducer,
    fetchUsersSuccess: fetchUsersSuccessReducer,
    fetchUsersError: fetchUsersErrorReducer,
    clearResults: clearResultsReducer,
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersError,
  clearResults,
} = githubUsersSlice.actions;

export default githubUsersSlice.reducer;
