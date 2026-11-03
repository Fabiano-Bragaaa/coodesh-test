import { type Database } from "@infra";

import { type Favorite } from "./favorite-types";

type FavoriteRow = Pick<Database["public"]["Tables"]["favorites"]["Row"], "word">;

function toFavorite(row: FavoriteRow): Favorite {
  return { id: row.word, word: row.word };
}

export const favoriteAdapter = { toFavorite };
