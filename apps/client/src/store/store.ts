import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { setupListeners } from "@reduxjs/toolkit/query";
import { githubApi } from "./api/githubApi";
import githubUsersReducer from "./slices/githubUsersSlice";
import githubSearchReducer from "./slices/githubSearchSlice";
import githubPaginationReducer from "./slices/githubPaginationSlice";
import githubUsersEpic from "./epics/githubUsersEpic";

const githubApiReducerPath = githubApi.reducerPath;
const githubApiReducer = githubApi.reducer;
const githubApiMiddleware = githubApi.middleware;

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: {
    githubUsers: githubUsersReducer,
    githubSearch: githubSearchReducer,
    githubPagination: githubPaginationReducer,
    [githubApiReducerPath]: githubApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApiMiddleware, epicMiddleware),
});

setupListeners(store.dispatch);

epicMiddleware.run(githubUsersEpic);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
