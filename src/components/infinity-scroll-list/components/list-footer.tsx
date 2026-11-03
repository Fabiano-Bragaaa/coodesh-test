import { View } from "react-native";

import { Button } from "../../button/button";
import { LoadingState } from "../../loading-state/loading-state";

type ListFooterProps = {
  isFetchingNextPage: boolean;
  isError: boolean;
  onRetry: () => void;
  retryLabel: string;
};

export function ListFooter({ isFetchingNextPage, isError, onRetry, retryLabel }: ListFooterProps) {
  if (isFetchingNextPage) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <View className="py-4">
        <Button title={retryLabel} variant="outline" onPress={onRetry} />
      </View>
    );
  }

  return null;
}
