import { useQuery } from "@tanstack/react-query";

type UseAppQueryReturn<TD> = {
  data?: TD;
  dataUpdatedAt: number;
  isLoading: boolean;
  isFetching: boolean;
  isPaused: boolean;
  error: Error | null;
  refetch: () => void;
};

type UseAppQueryParams<TD> = {
  queryKey: (string | number | undefined | null)[];
  queryFn: () => Promise<TD>;
  enabled?: boolean;
  staleTime?: number;
  retry?: number;
};

export function useAppQuery<TD>({
  queryKey,
  queryFn,
  enabled,
  staleTime,
  retry,
}: UseAppQueryParams<TD>): UseAppQueryReturn<TD> {
  const query = useQuery<TD, Error, TD>({
    queryKey,
    queryFn,
    enabled,
    staleTime,
    retry,
  });

  function refetch() {
    query.refetch();
  }

  return {
    data: query.data,
    dataUpdatedAt: query.dataUpdatedAt,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isPaused: query.isPaused,
    error: query.error,
    refetch,
  };
}
