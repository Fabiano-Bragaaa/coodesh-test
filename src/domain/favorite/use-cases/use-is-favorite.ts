import { queryKeys, useAppQuery } from "@infra";

import { favoriteService } from "../favorite-service";

export function useIsFavorite(userId: string | undefined, word: string) {
  return useAppQuery({
    queryKey: queryKeys.favorites.one(userId, word),
    queryFn: () => favoriteService.isFavorite(word),
  });
}
