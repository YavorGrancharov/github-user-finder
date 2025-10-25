import { ofType } from "redux-observable";
import { debounceTime, switchMap, map, catchError, of, from } from "rxjs";
import {
  DEFAULT_PAGE_SIZE,
  GithubUsersRequest,
  GithubUsersResponse,
  MAX_PAGE_SIZE,
} from "shared";
import { GithubSearchState, setSearch } from "../slices/githubSearchSlice";
import {
  GithubPaginationState,
  setCurrentPage,
} from "../slices/githubPaginationSlice";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersError,
  GithubUsersState,
} from "../slices/githubUsersSlice";
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
        return of(fetchUsersError("Empty search term"));
      }

      return of(fetchUsersStart()).pipe(
        switchMap(() =>
          fetchGithubUsers({ search, page: currentPage, pageSize: MAX_PAGE_SIZE }).then(
            (data) =>
              fetchUsersSuccess({ items: data.items, total: data.total }),
            (err) => fetchUsersError(err.message)
          )
        ),
        catchError((err) => of(fetchUsersError(err.message)))
      );
    })
  );

export default githubUsersEpic;
