import { View } from "react-native";

import { Button } from "../button/button";
import { Text } from "../text/text";

type ErrorStateProps = {
  message: string;
  retryLabel: string;
  onRetry: () => void;
};

export function ErrorState({ message, retryLabel, onRetry }: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center gap-4 px-8">
      <Text variant="body-md" align="center" className="text-text-muted">
        {message}
      </Text>
      <Button title={retryLabel} variant="outline" onPress={onRetry} />
    </View>
  );
}
