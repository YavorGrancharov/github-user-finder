import { PayloadAction } from "@reduxjs/toolkit";
import { GithubUser } from "shared";
import { GithubCacheState } from "../types";

export const setCacheReducer = (
  state: GithubCacheState,
  action: PayloadAction<{ key: string; items: GithubUser[]; total: number }>
) => {
  state[action.payload.key] = {
    items: action.payload.items,
    total: action.payload.total,
  };
};

export default setCacheReducer;
