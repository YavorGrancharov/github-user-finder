import { combineEpics } from "redux-observable";
import githuFetchbUsersEpic from "./githubFetchUsersEpic";
import githubPrefetchUsersEpic from "./githubPrefetchUsersEpic";

export const rootEpic = combineEpics(
  ...githuFetchbUsersEpic,
  ...githubPrefetchUsersEpic,
);
