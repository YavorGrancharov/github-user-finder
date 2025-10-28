import { combineEpics } from "redux-observable";
import githubUsersEpic from "./githubUsersEpic";
import githubPrefetchEpic from "./githubPrefetchEpic";

export const rootEpic = combineEpics(githubUsersEpic, githubPrefetchEpic);
