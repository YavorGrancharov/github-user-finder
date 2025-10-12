import { useEffect } from "react";
import { DEFAULT_PAGE_SIZE } from "shared";
import Search from "@components/Search/Search";
import DataGrid from "@components/DataGrid/DataGrid";
import { useDebounceValue } from "@hooks/useDebounce";
import {
  useFetchGithubUsersQuery,
  usePrefetch,
  // updateQueryData,
} from "@store/api/githubApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setSearch,
  setCurrentPage,
  setGithubUsers,
  resetSearch,
  clearResults,
} from "../store/slices/githubUsersSlice";
import {
  currentPageSelector,
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

  const dispatch = useAppDispatch();

  const prefetchGithubUsers = usePrefetch(SEARCH_RESULTS_QUERY_KEY);

  const debouncedSearch = useDebounceValue(search, 1000);

  const shouldFetch = !!debouncedSearch.trim();

  const { data: queryData, isFetching } = useFetchGithubUsersQuery(
    {
      pageSize: DEFAULT_PAGE_SIZE,
      search: debouncedSearch,
      page: currentPage,
    },
    {
      skip: !shouldFetch,
    }
  );

  const renderItems = renderCells(items || [], search);

  const onSearch = (term: string) => {
    if (!term.trim()) {
      dispatch(resetSearch());
      return;
    }
    dispatch(setSearch(term));
  };

  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    dispatch(
      setGithubUsers({
        items: queryData?.items || [],
        total: queryData?.total || 0,
      })
    );
  }, [dispatch, queryData]);

  useEffect(() => {
    if (!shouldFetch) return;

    const totalPages = Math.ceil((totalItems || 0) / DEFAULT_PAGE_SIZE);
    if (currentPage >= totalPages) return;

    const nextPage = currentPage + 1;

    prefetchGithubUsers({
      pageSize: DEFAULT_PAGE_SIZE,
      search: debouncedSearch,
      page: nextPage,
    });
  }, [
    currentPage,
    totalItems,
    shouldFetch,
    prefetchGithubUsers,
    debouncedSearch,
  ]);

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
        isLoading={isFetching}
        totalItems={totalItems || 0}
        onPageChange={onPageChange}
        onItemClick={(item) => openInNewTab(item.profileUrl)}
      />
    </MainContainer>
  );
};

export default GithubUsersPage;
