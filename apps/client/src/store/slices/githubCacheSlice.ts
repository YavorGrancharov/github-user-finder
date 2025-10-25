import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GithubUser } from "shared";

type GithubCacheState = {
  [key: string]: {
    items: GithubUser[];
    total: number;
  };
};

const initialState: GithubCacheState = {
  "": {
    items: [],
    total: 0,
  },
};

const githubCacheSlice = createSlice({
  name: "githubCache",
  initialState,
  reducers: {
    setCache(
      state,
      action: PayloadAction<{ key: string; items: GithubUser[]; total: number }>
    ) {
      state[action.payload.key] = {
        items: action.payload.items,
        total: action.payload.total,
      };
    },
  },
});

export const { setCache } = githubCacheSlice.actions;
export default githubCacheSlice.reducer;
