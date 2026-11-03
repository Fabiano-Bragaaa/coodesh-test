import { useMutation } from "@tanstack/react-query";

export type UseAppMutationOptions<TD> = {
  onSuccess?: (data: TD) => void;
  onError?: (error: Error) => void;
};

type UseAppMutationReturn<TV> = {
  mutate: (variables: TV) => void;
  isLoading: boolean;
  error: Error | null;
};

type UseAppMutationParams<TD, TV, TCtx> = {
  mutationKey?: string[];
  mutationFn: (variables: TV) => Promise<TD>;
  onMutate?: (variables: TV) => TCtx | Promise<TCtx>;
  onSuccess?: (data: TD, variables: TV, context: TCtx | undefined) => void;
  onError?: (error: Error, variables: TV, context: TCtx | undefined) => void;
  onSettled?: (
    data: TD | undefined,
    error: Error | null,
    variables: TV,
    context: TCtx | undefined,
  ) => void;
  retry?: number;
  retryDelay?: (attemptIndex: number) => number;
  quiet?: boolean;
};

export function useAppMutation<TD, TV = void, TCtx = unknown>({
  mutationKey,
  mutationFn,
  onMutate,
  onSuccess,
  onError,
  onSettled,
  retry,
  retryDelay,
  quiet = false,
}: UseAppMutationParams<TD, TV, TCtx>): UseAppMutationReturn<TV> {
  const { mutate, isPending, error } = useMutation<TD, Error, TV, TCtx>({
    mutationKey,
    mutationFn,
    onMutate,
    onSuccess,
    onError,
    onSettled,
    retry,
    retryDelay,
    meta: quiet ? { quiet: true } : undefined,
  });

  return { mutate, isLoading: isPending, error };
}
