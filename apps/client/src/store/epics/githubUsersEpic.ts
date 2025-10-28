import { ofType } from "redux-observable";
import { debounceTime, switchMap, catchError, of, from, merge } from "rxjs";
import { DEFAULT_PAGE_SIZE, GithubUsersResponse } from "shared";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersError,
  setCurrentPage,
  setCache,
  setSearch,
} from "../slices";
import { fetchGithubUsers } from "../api/githubApi";
import { AppEpic } from "../types";

const githubUsersEpic: AppEpic = ($action, $state) =>
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
          })
        );
      }

      return of(fetchUsersStart()).pipe(
        switchMap(() =>
          from(
            fetchGithubUsers({
              search,
              page: currentPage,
              pageSize: DEFAULT_PAGE_SIZE,
            })
          ).pipe(
            switchMap((data: GithubUsersResponse) =>
              merge(
                of(
                  setCache({
                    key: cacheKey,
                    items: data.items,
                    total: data.total,
                  })
                ),
                of(fetchUsersSuccess({ items: data.items, total: data.total }))
              )
            ),
            catchError((err: any) => of(fetchUsersError(err.message)))
          )
        )
      );
    })
  );

export default githubUsersEpic;
