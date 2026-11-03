import { useInfiniteQuery } from "@tanstack/react-query";

type AppQueryKey = (string | number | undefined | null)[];

type UseAppInfiniteQueryParams<TPage> = {
  queryKey: AppQueryKey;
  queryFn: (cursor: number) => Promise<TPage>;
  initialCursor: number;
  nextCursor: (lastPage: TPage) => number | null;
  enabled?: boolean;
  staleTime?: number;
};

type UseAppInfiniteQueryReturn<TPage> = {
  pages: TPage[];
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMore: boolean;
  error: Error | null;
  fetchMore: () => void;
  refetch: () => void;
};

export function useAppInfiniteQuery<TPage>({
  queryKey,
  queryFn,
  initialCursor,
  nextCursor,
  enabled,
  staleTime,
}: UseAppInfiniteQueryParams<TPage>): UseAppInfiniteQueryReturn<TPage> {
  const { data, isLoading, isFetchingNextPage, hasNextPage, error, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam),
    initialPageParam: initialCursor,
    getNextPageParam: (lastPage: TPage) => nextCursor(lastPage) ?? undefined,
    enabled,
    staleTime,
  });

  return {
    pages: data?.pages ?? [],
    isLoading,
    isFetchingMore: isFetchingNextPage,
    hasMore: hasNextPage,
    error,
    fetchMore: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    refetch: () => {
      refetch();
    },
  };
}
