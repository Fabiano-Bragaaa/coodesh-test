import { queryKeys, usePaginatedList } from "@infra";

import { favoriteService } from "../favorite-service";

export function useFavoriteList(userId: string | undefined) {
  return usePaginatedList(queryKeys.favorites.list(userId), favoriteService.getList);
}
