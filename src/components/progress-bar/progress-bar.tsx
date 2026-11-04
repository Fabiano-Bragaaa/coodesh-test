import { View } from "react-native";
import Animated from "react-native-reanimated";

import { useProgressBar } from "@animations";

const PERCENT = 100;

type ProgressBarProps = {
  progress: number;
  label: string;
};

export function ProgressBar({ progress, label }: ProgressBarProps) {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const { fillStyle } = useProgressBar(clamped);

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: PERCENT, now: Math.round(clamped * PERCENT) }}
      className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
      <Animated.View className="h-full rounded-full bg-primary" style={fillStyle} />
    </View>
  );
}
