import { ActivityIndicator, View } from "react-native";

import { colors } from "@theme";

export function LoadingState() {
  return (
    <View className="flex-1 items-center justify-center py-8">
      <ActivityIndicator color={colors.primary} />
    </View>
  );
}
