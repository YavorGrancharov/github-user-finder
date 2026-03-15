import { ofType } from "redux-observable";
import { debounceTime, switchMap, catchError, of, from } from "rxjs";
import { DEFAULT_PAGE_SIZE, GithubUsersRequest } from "shared";
import {
  fetchUsersSuccess,
  fetchUsersError,
  setCurrentPage,
  setCache,
  setSearch,
  fetchUsers,
  fetchUsersStart,
} from "../slices";
import { fetchGithubUsers } from "../api/githubApi";
import { AppEpic } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";

export const githubFetchUsersStartEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(setSearch.type, setCurrentPage.type),
    debounceTime(500),
    switchMap(() => {
      const { search } = $state.value.githubSearch;
      const { currentPage } = $state.value.githubPagination;

      if (!search.trim()) {
        return of(fetchUsersSuccess({ items: [], total: 0 }));
      }

      const cacheKey = `github:users:${search}:${currentPage}:${DEFAULT_PAGE_SIZE}`;
      const cachedData = $state.value.githubCache[cacheKey];

      if (cachedData) {
        return of(
          fetchUsersSuccess({
            items: cachedData.items,
            total: cachedData.total,
          }),
        );
      }

      return from([
        fetchUsersStart(),
        fetchUsers({
          search,
          page: currentPage,
          pageSize: DEFAULT_PAGE_SIZE,
        }),
      ]);
    }),
  );

export const githubFetchUsersEpic: AppEpic = ($action) =>
  $action.pipe(
    ofType(fetchUsers.type),
    switchMap((action: PayloadAction<GithubUsersRequest>) => {
      const { search, page, pageSize } = action.payload;

      console.log(
        `Fetching users for search="${search}", page=${page}, pageSize=${pageSize}`,
      );

      const cacheKey = `github:users:${search}:${page}:${pageSize}`;

      return from(fetchGithubUsers({ search, page, pageSize })).pipe(
        switchMap((data) => [
          setCache({
            key: cacheKey,
            items: data.items,
            total: data.total,
          }),
          fetchUsersSuccess({ items: data.items, total: data.total }),
        ]),
        catchError((err) => of(fetchUsersError(err.message))),
      );
    }),
  );

export default [githubFetchUsersStartEpic, githubFetchUsersEpic];
