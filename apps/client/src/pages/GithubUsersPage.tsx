import { useEffect, useState } from "react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DEFAULT_PAGE_SIZE } from "shared";
import Search from "@components/Search/Search";
import DataGrid from "@components/DataGrid/DataGrid";
import { useDebounceValue } from "@hooks/useDebounce";
import { fetchGithubUsers } from "@api/github";
import { openInNewTab } from "./utils";
import { renderCells } from "./RenderCells";
import {
  SearchContainer,
  MainContainer,
  MainTitle,
} from "./GithubUsersPage.styles";

const SEARCH_RESULTS_QUERY_KEY = "search-results";

export const GithubUsersPage = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounceValue(search, 1000);

  const { data, isFetching } = useQuery({
    queryKey: [SEARCH_RESULTS_QUERY_KEY, debouncedSearch, currentPage],
    queryFn: () =>
      fetchGithubUsers({
        pageSize: DEFAULT_PAGE_SIZE,
        search: debouncedSearch,
        page: currentPage,
      }),
    enabled: debouncedSearch.trim().length > 0,
    placeholderData: keepPreviousData,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const renderItems = renderCells(data?.items || [], search);

  const clearResults = () => {
    queryClient.cancelQueries({ queryKey: [SEARCH_RESULTS_QUERY_KEY] });
    queryClient.setQueryData([SEARCH_RESULTS_QUERY_KEY, "", 1], {
      items: [],
      total: 0,
    });
  };

  const onSearch = (term: string) => {
    setCurrentPage(1);
    setSearch(term);

    if (!term.trim()) {
      clearResults();
    }
  };

  useEffect(() => {
    if (!debouncedSearch.trim()) return;

    const totalPages = Math.ceil((data?.total || 0) / DEFAULT_PAGE_SIZE);
    if (currentPage >= totalPages) return;

    const nextPage = currentPage + 1;
    const nextPageQueryKey = [
      SEARCH_RESULTS_QUERY_KEY,
      debouncedSearch,
      nextPage,
    ];

    if (!queryClient.getQueryData(nextPageQueryKey)) {
      queryClient.prefetchQuery({
        queryKey: nextPageQueryKey,
        queryFn: () =>
          fetchGithubUsers({
            pageSize: DEFAULT_PAGE_SIZE,
            search: debouncedSearch,
            page: nextPage,
          }),
      });
    }
  }, [currentPage, data?.total, debouncedSearch, queryClient]);

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
        totalItems={data?.total || 0}
        onPageChange={setCurrentPage}
        onItemClick={(item) => openInNewTab(item.profileUrl)}
      />
    </MainContainer>
  );
};

export default GithubUsersPage;
