import { View } from "react-native";

import { Text } from "../text/text";

type EmptyStateProps = {
  message: string;
};

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <Text variant="body-md" align="center" className="text-text-muted">
        {message}
      </Text>
    </View>
  );
}
