import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { setupListeners } from "@reduxjs/toolkit/query";
import logger from "redux-logger";
import githubUsersReducer from "./slices/githubUsersSlice";
import githubSearchReducer from "./slices/githubSearchSlice";
import githubPaginationReducer from "./slices/githubPaginationSlice";
import githubCacheReducer from "./slices/githubCacheSlice";
import { rootEpic } from "./epics/rootEpic";

const epicMiddleware = createEpicMiddleware();

const middlewares = [epicMiddleware, logger];

const store = configureStore({
  reducer: {
    githubUsers: githubUsersReducer,
    githubSearch: githubSearchReducer,
    githubPagination: githubPaginationReducer,
    githubCache: githubCacheReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

setupListeners(store.dispatch);

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
