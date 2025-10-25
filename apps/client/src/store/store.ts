import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { setupListeners } from "@reduxjs/toolkit/query";
import githubUsersReducer from "./slices/githubUsersSlice";
import githubSearchReducer from "./slices/githubSearchSlice";
import githubPaginationReducer from "./slices/githubPaginationSlice";
import githubCacheReducer from "./slices/githubCacheSlice";
import githubUsersEpic from "./epics/githubUsersEpic";

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: {
    githubUsers: githubUsersReducer,
    githubSearch: githubSearchReducer,
    githubPagination: githubPaginationReducer,
    githubCache: githubCacheReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

setupListeners(store.dispatch);

epicMiddleware.run(githubUsersEpic);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
