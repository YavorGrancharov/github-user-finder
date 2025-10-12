import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { githubApi } from "./api/githubApi";
import githubUsersReducer from "./slices/githubUsersSlice";

const githubApiReducerPath = githubApi.reducerPath;
const githubApiReducer = githubApi.reducer;
const githubApiMiddleware = githubApi.middleware;

const store = configureStore({
  reducer: {
    githubUsers: githubUsersReducer,
    [githubApiReducerPath]: githubApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApiMiddleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
