import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

type AppQueryKey = (string | number | undefined | null)[];

type UseAppFetchQueryParams<TParams, TData> = {
  queryKey: (params: TParams) => AppQueryKey;
  queryFn: () => Promise<TData>;
};

export function useAppFetchQuery<TParams, TData>({
  queryKey,
  queryFn,
}: UseAppFetchQueryParams<TParams, TData>) {
  const queryClient = useQueryClient();

  return useCallback(
    (params: TParams): Promise<TData> =>
      queryClient.fetchQuery({ queryKey: queryKey(params), queryFn }),
    [queryClient, queryKey, queryFn],
  );
}
