import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GithubUsersRequest, GithubUsersResponse } from "shared";

const BASE_API_URL = "/api/github/users";

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  keepUnusedDataFor: 5 * 60 * 1000,
  endpoints: (builder) => ({
    fetchGithubUsers: builder.query<GithubUsersResponse, GithubUsersRequest>({
      query: ({ pageSize, search = "", page = 1 }) => ({
        url: "",
        params: {
          pageSize,
          search,
          page,
        },
      }),
    }),
  }),
  refetchOnFocus: false,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
});

export const {
  useFetchGithubUsersQuery,
  usePrefetch,
  reducer,
  middleware,
  reducerPath,
} = githubApi;
