import { EmptyState } from "../../empty-state/empty-state";
import { ErrorState } from "../../error-state/error-state";
import { LoadingState } from "../../loading-state/loading-state";

export type EmptyListProps = {
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  emptyMessage: string;
  errorMessage: string;
  retryLabel: string;
};

export function EmptyList({ isLoading, isError, onRetry, emptyMessage, errorMessage, retryLabel }: EmptyListProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState message={errorMessage} retryLabel={retryLabel} onRetry={onRetry} />;
  }

  return <EmptyState message={emptyMessage} />;
}
