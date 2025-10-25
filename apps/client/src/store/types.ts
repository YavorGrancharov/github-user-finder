import { Epic } from "redux-observable";
import { UnknownAction } from "redux";
import { RootState } from "./store";

export type AppEpic = Epic<UnknownAction, UnknownAction, RootState>;
