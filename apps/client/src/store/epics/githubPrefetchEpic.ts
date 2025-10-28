import { switchMap, of, catchError, EMPTY, from } from "rxjs";
import { DEFAULT_PAGE_SIZE, GithubUsersResponse } from "shared";
import { fetchUsersSuccess, setCache } from "../slices";
import { fetchGithubUsers } from "../api/githubApi";
import { AppEpic } from "../types";
import { ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  prefetchUsersFailure,
  prefetchUsersStart,
  prefetchUsersSuccess,
} from "@store/actions/prefetchUsersActions";

const githubPrefetchUsersEpic: AppEpic = ($action, $state) =>
  $action.pipe(
    ofType(fetchUsersSuccess.type),
    switchMap((action: PayloadAction<GithubUsersResponse>) => {
      const { search } = $state.value.githubSearch;
      const { currentPage } = $state.value.githubPagination;
      const { total } = action.payload;

      const nextPage = currentPage + 1;
      const totalPages = Math.ceil(total / DEFAULT_PAGE_SIZE);

      const cacheKey = `github:users:${search}:${nextPage}:${DEFAULT_PAGE_SIZE}`;

      if (nextPage > totalPages) return EMPTY;

      if ($state.value.githubCache[cacheKey]) return EMPTY;

      return of(prefetchUsersStart()).pipe(
        switchMap(() =>
          from(
            fetchGithubUsers({
              search,
              page: nextPage,
              pageSize: DEFAULT_PAGE_SIZE,
            })
          ).pipe(
            switchMap((response) => [
              setCache({
                key: cacheKey,
                items: response.items,
                total: response.total,
              }),
              prefetchUsersSuccess(response),
            ]),
            catchError((err) => of(prefetchUsersFailure(err.message)))
          )
        )
      );
    })
  );

export default githubPrefetchUsersEpic;
