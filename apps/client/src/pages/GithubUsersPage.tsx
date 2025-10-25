import { useEffect } from "react";
import { DataGrid, Search } from "@components";
import { useDebounceValue } from "@hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
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
  shouldFetchUsersSelector,
} from "../store/selectors/githubUsersSelectors";
import { openInNewTab } from "./utils";
import { renderCells } from "./RenderCells";
import {
  SearchContainer,
  MainContainer,
  MainTitle,
} from "./GithubUsersPage.styles";

export const GithubUsersPage = () => {
  const search = useAppSelector(searchUsersSelector);
  const currentPage = useAppSelector(currentPageSelector);
  const items = useAppSelector(githubUsersSelector);
  const totalItems = useAppSelector(githubUsersTotalSelector);
  const shouldFetchUsers = useAppSelector(shouldFetchUsersSelector);
  const isLoading = useAppSelector(githubUsersLoadingSelector);
  const error = useAppSelector(githubUsersErrorSelector);

  const dispatch = useAppDispatch();

  console.log(items, totalItems);

  const debouncedSearch = useDebounceValue(search, 1000);
  const shouldFetch = shouldFetchUsers;
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
  }, [dispatch, shouldFetch]);

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      dispatch(clearResults());
    }
  }, [debouncedSearch, dispatch]);

  if (error) {
    return <div>{error}</div>;
  }

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
