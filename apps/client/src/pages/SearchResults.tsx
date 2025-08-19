import { useEffect, useState } from "react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { DEFAULT_PAGE_SIZE, GithubUser } from "shared";
import Search from "@components/Search/Search";
import UsersList from "@components/List/List";
import { useDebounceValue } from "@hooks/useDebounce";
import { fetchGithubUsers } from "@api/github";
import { openInNewTab } from "./utils";
import {
  SearchContainer,
  MainContainer,
  MainTitle,
} from "./SearchResults.styles";

const SEARCH_RESULTS_QUERY_KEY = "search-results";

export const SearchResults = () => {
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
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const renderItems =
    data?.items?.map((item: GithubUser) => ({
      label: item.username,
      imageUrl: item.avatarUrl,
      count: item.publicReposCount,
      profileUrl: item.githubProfileUrl,
    })) || [];

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
      <UsersList
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

export default SearchResults;
