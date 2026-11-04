import { useEffect, useState } from "react";
import { type LayoutChangeEvent } from "react-native";

export function useFillViewport(onEndReached: () => void) {
  const [viewportHeight, setViewportHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const needsMore = viewportHeight > 0 && contentHeight > 0 && contentHeight < viewportHeight;

  useEffect(() => {
    if (needsMore) {
      onEndReached();
    }
  }, [contentHeight, needsMore, onEndReached]);

  function measureViewport(event: Pick<LayoutChangeEvent, "nativeEvent">) {
    setViewportHeight(event.nativeEvent.layout.height);
  }

  function measureContent(_width: number, height: number) {
    setContentHeight(height);
  }

  return { measureViewport, measureContent };
}
