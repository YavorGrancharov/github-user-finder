import { useEffect } from "react";
import { DEFAULT_PAGE_SIZE } from "shared";
import { DataGrid, Search } from "@components";
import { useDebounceValue } from "@hooks/useDebounce";
import { useFetchGithubUsersQuery, usePrefetch } from "@store/api/githubApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchUsersSuccess,
  clearResults,
  fetchUsersStart,
} from "../store/slices/githubUsersSlice";
import { setSearch, resetSearch } from "../store/slices/githubSearchSlice";
import { setCurrentPage } from "../store/slices/githubPaginationSlice";
import {
  currentPageSelector,
  githubUsersErrorSelector,
  githubUsersLoadingSelector,
  githubUsersSelector,
  githubUsersTotalSelector,
  searchUsersSelector,
} from "../store/selectors/githubUsersSelectors";
import { openInNewTab } from "./utils";
import { renderCells } from "./RenderCells";
import {
  SearchContainer,
  MainContainer,
  MainTitle,
} from "./GithubUsersPage.styles";

const SEARCH_RESULTS_QUERY_KEY = "fetchGithubUsers";

export const GithubUsersPage = () => {
  const search = useAppSelector(searchUsersSelector);
  const currentPage = useAppSelector(currentPageSelector);
  const items = useAppSelector(githubUsersSelector);
  const totalItems = useAppSelector(githubUsersTotalSelector);
  const isLoading = useAppSelector(githubUsersLoadingSelector);
  const error = useAppSelector(githubUsersErrorSelector);

  console.log(error)

  const dispatch = useAppDispatch();

  const debouncedSearch = useDebounceValue(search, 1000);

  const shouldFetch = !!debouncedSearch.trim();

  const renderItems = renderCells(items || [], search);

  const onSearch = (term: string) => {
    if (!term.trim()) {
      dispatch(resetSearch());
      dispatch(clearResults());
      return;
    }
    dispatch(setSearch(term));
    dispatch(setCurrentPage(1));
  };

  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const onGridCellClick = (cellItem: any) => {
    openInNewTab(cellItem.html_url);
  };

  useEffect(() => {
    if (shouldFetch) {
      dispatch(fetchUsersStart());
    }
  }, [debouncedSearch, currentPage, shouldFetch, dispatch]);

  useEffect(() => {
    if (!shouldFetch) {
      dispatch(clearResults());
    }
  }, [dispatch, shouldFetch]);

  return (
    <MainContainer>
      <MainTitle>GitHub Users Finder</MainTitle>
      <SearchContainer>
        <Search onSearch={onSearch} />
      </SearchContainer>
      <DataGrid
        searchTerm={debouncedSearch}
        currentPage={currentPage}
        items={renderItems}
        isLoading={isLoading}
        totalItems={totalItems || 0}
        onPageChange={onPageChange}
        onItemClick={onGridCellClick}
      />
    </MainContainer>
  );
};

export default GithubUsersPage;
