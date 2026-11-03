import { useSafeAreaInsets } from "react-native-safe-area-context";

const MIN_INSET = 16;

export function useAppSafeArea() {
  const { top, bottom } = useSafeAreaInsets();

  return {
    top: Math.max(top, MIN_INSET),
    bottom: Math.max(bottom, MIN_INSET),
  };
}
