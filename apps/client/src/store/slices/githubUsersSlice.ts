import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GithubUser } from "shared";

export type GithubUsersState = {
  items: GithubUser[];
  total: number;
  isLoading: boolean;
  error: string | null;
};

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
    fetchUsersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUsersSuccess: (
      state,
      action: PayloadAction<{ items: GithubUser[]; total: number }>
    ) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.isLoading = false;
    },
    fetchUsersError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearResults: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersError,
  clearResults,
} = githubUsersSlice.actions;

export default githubUsersSlice.reducer;
