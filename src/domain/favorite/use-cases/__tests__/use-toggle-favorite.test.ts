import { act, renderHook, waitFor } from "test-utils";

import { favoriteService } from "../../favorite-service";
import { useIsFavorite } from "../use-is-favorite";
import { useToggleFavorite } from "../use-toggle-favorite";

const USER_ID = "user-1";
const WORD = "hello";

function useFavoriteWord() {
  const isFavorite = useIsFavorite(USER_ID, WORD);
  const toggleFavorite = useToggleFavorite(USER_ID);

  return { isFavorite, toggleFavorite };
}

function deferred() {
  let resolve: () => void = () => undefined;
  let reject: (error: Error) => void = () => undefined;
  const promise = new Promise<void>((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });

  return { promise, resolve, reject };
}

describe("useToggleFavorite", () => {
  beforeEach(() => {
    jest.spyOn(favoriteService, "isFavorite").mockResolvedValue(false);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("marks the word as favorite before the request finishes", async () => {
    const request = deferred();
    jest.spyOn(favoriteService, "toggle").mockReturnValueOnce(request.promise);

    const { result } = await renderHook(() => useFavoriteWord());

    await waitFor(() => expect(result.current.isFavorite.data).toBe(false));

    await act(() => result.current.toggleFavorite.mutate({ word: WORD, favorite: true }));

    await waitFor(() => expect(result.current.isFavorite.data).toBe(true));
    expect(favoriteService.toggle).toHaveBeenCalledWith({ word: WORD, favorite: true }, expect.anything());

    await act(() => request.resolve());

    await waitFor(() => expect(result.current.toggleFavorite.isLoading).toBe(false));
    expect(result.current.isFavorite.data).toBe(true);
  });

  it("restores the previous value when the request fails", async () => {
    const request = deferred();
    jest.spyOn(favoriteService, "toggle").mockReturnValueOnce(request.promise);

    const { result } = await renderHook(() => useFavoriteWord());

    await waitFor(() => expect(result.current.isFavorite.data).toBe(false));

    await act(() => result.current.toggleFavorite.mutate({ word: WORD, favorite: true }));

    await waitFor(() => expect(result.current.isFavorite.data).toBe(true));

    await act(() => request.reject(new Error("network")));

    await waitFor(() => expect(result.current.isFavorite.data).toBe(false));
  });
});
