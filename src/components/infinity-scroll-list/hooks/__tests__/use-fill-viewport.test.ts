import { type LayoutChangeEvent } from "react-native";
import { act, renderHook } from "test-utils";

import { useFillViewport } from "../use-fill-viewport";

function layoutOf(height: number): Pick<LayoutChangeEvent, "nativeEvent"> {
  return { nativeEvent: { layout: { x: 0, y: 0, width: 400, height } } };
}

async function renderMeasured(viewportHeight: number, contentHeight: number) {
  const onEndReached = jest.fn();
  const { result } = await renderHook(() => useFillViewport(onEndReached));

  await act(() => {
    result.current.measureViewport(layoutOf(viewportHeight));
    result.current.measureContent(400, contentHeight);
  });

  return onEndReached;
}

describe("useFillViewport", () => {
  it("asks for the next page while the items don't fill the screen", async () => {
    const onEndReached = await renderMeasured(800, 560);

    expect(onEndReached).toHaveBeenCalled();
  });

  it("leaves the next page to the scroll once the items fill the screen", async () => {
    const onEndReached = await renderMeasured(800, 1600);

    expect(onEndReached).not.toHaveBeenCalled();
  });

  it("waits until both sizes are measured", async () => {
    const onEndReached = jest.fn();

    await renderHook(() => useFillViewport(onEndReached));

    expect(onEndReached).not.toHaveBeenCalled();
  });
});
