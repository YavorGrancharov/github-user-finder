import { createSlice } from "@reduxjs/toolkit";
import setCacheReducer from "@store/reducers/githubCacheReducer";
import { GithubCacheState } from "@store/types";

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
    setCache: setCacheReducer,
  },
});

export const { setCache } = githubCacheSlice.actions;
export default githubCacheSlice.reducer;
