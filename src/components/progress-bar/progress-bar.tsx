import { View } from "react-native";

const PERCENT = 100;

type ProgressBarProps = {
  progress: number;
  label: string;
};

export function ProgressBar({ progress, label }: ProgressBarProps) {
  const percent = Math.round(Math.min(Math.max(progress, 0), 1) * PERCENT);

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: PERCENT, now: percent }}
      className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
      <View className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
    </View>
  );
}
