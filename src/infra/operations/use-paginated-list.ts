import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { type Page } from "../pagination/page-types";

const FIRST_PAGE = 1;

export type UsePaginatedListResult<Data> = {
  list: Data[];
  isError: boolean;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  isRefreshing: boolean;
  hasNextPage: boolean;
  refresh: () => void;
  fetchNextPage: () => void;
};

type PaginatedListOptions = {
  enabled?: boolean;
  staleTime?: number;
};

export function usePaginatedList<Data>(
  queryKey: readonly unknown[],
  getList: (page: number) => Promise<Page<Data>>,
  options?: PaginatedListOptions,
): UsePaginatedListResult<Data> {
  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => getList(pageParam),
    initialPageParam: FIRST_PAGE,
    getNextPageParam: ({ meta }) => (meta.hasNextPage ? meta.currentPage + 1 : undefined),
    ...options,
  });

  const list = useMemo(() => query.data?.pages.flatMap((page) => page.data) ?? [], [query.data]);

  function refresh() {
    query.refetch();
  }

  function fetchNextPage() {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }

  return {
    list,
    isError: query.isError,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    isRefreshing: query.isRefetching && !query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    refresh,
    fetchNextPage,
  };
}
