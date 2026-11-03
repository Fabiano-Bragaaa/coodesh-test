import { useQueryClient } from "@tanstack/react-query";

import { queryKeys, useAppMutation } from "@infra";

import { favoriteService } from "../favorite-service";
import { type ToggleFavoriteInput } from "../favorite-types";

export function useToggleFavorite(userId: string | undefined) {
  const queryClient = useQueryClient();

  async function showToggled({ word, favorite }: ToggleFavoriteInput) {
    const queryKey = queryKeys.favorites.one(userId, word);

    await queryClient.cancelQueries({ queryKey });
    queryClient.setQueryData(queryKey, favorite);
  }

  function undoToggled(_error: Error, { word, favorite }: ToggleFavoriteInput) {
    queryClient.setQueryData(queryKeys.favorites.one(userId, word), !favorite);
  }

  function refreshList() {
    queryClient.invalidateQueries({ queryKey: queryKeys.favorites.list(userId) });
  }

  return useAppMutation<void, ToggleFavoriteInput>({
    mutationFn: favoriteService.toggle,
    onMutate: showToggled,
    onError: undoToggled,
    onSettled: refreshList,
  });
}
