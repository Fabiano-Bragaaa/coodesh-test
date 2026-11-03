import { useIsFavorite, useToggleFavorite } from "@domain";
import { useAuth } from "@services";

export function useWordFavorite(word: string) {
  const { user } = useAuth();
  const isFavorite = useIsFavorite(user?.id, word);
  const toggleFavorite = useToggleFavorite(user?.id);
  const favorite = isFavorite.data ?? false;

  function toggle() {
    toggleFavorite.mutate({ word, favorite: !favorite });
  }

  return { favorite, toggle };
}
