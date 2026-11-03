import { useQueryClient } from "@tanstack/react-query";

import { queryKeys, useAppMutation } from "@infra";

import { favoriteService } from "../favorite-service";
import { type ToggleFavoriteInput } from "../favorite-types";

export function useToggleFavorite(userId: string | undefined) {
  const queryClient = useQueryClient();

  return useAppMutation<void, ToggleFavoriteInput>({
    mutationFn: favoriteService.toggle,
    onMutate: async ({ word, favorite }) => {
      const queryKey = queryKeys.favorites.one(userId, word);

      await queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, favorite);
    },
    onError: (_error, { word, favorite }) => {
      queryClient.setQueryData(queryKeys.favorites.one(userId, word), !favorite);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.list(userId) });
    },
  });
}
