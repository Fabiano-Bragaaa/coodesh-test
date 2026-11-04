import { useEffect } from "react";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { animationConfig } from "../config/animation";

const FULL_WIDTH_PERCENT = 100;

export function useProgressBar(progress: number) {
  const { fill } = animationConfig.progressBar;
  const filled = useSharedValue(progress);

  useEffect(() => {
    filled.value = withTiming(progress, fill);
  }, [fill, filled, progress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${filled.value * FULL_WIDTH_PERCENT}%`,
  }));

  return { fillStyle };
}
