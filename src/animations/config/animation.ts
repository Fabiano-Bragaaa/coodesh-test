import { Easing, type WithTimingConfig } from "react-native-reanimated";

const progressBarFill: WithTimingConfig = {
  duration: 100,
  easing: Easing.linear,
};

export const animationConfig = {
  progressBar: {
    fill: progressBarFill,
  },
};
