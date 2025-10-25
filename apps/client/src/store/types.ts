import { Epic } from "redux-observable";
import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type AppEpic = Epic<UnknownAction, UnknownAction, RootState>;
