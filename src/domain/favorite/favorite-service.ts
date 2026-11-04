import { type Page, pageAdapter } from "@infra";

import { favoriteAdapter } from "./favorite-adapter";
import { favoriteApi } from "./favorite-api";
import { type Favorite, type ToggleFavoriteInput } from "./favorite-types";

const FAVORITES_PER_PAGE = 21;

async function getList(page: number): Promise<Page<Favorite>> {
  const params = { page, perPage: FAVORITES_PER_PAGE };

  return pageAdapter.toPage(await favoriteApi.getList(params), params, favoriteAdapter.toFavorite);
}

async function isFavorite(word: string): Promise<boolean> {
  return (await favoriteApi.findOne(word)) !== null;
}

async function toggle({ word, favorite }: ToggleFavoriteInput): Promise<void> {
  if (favorite) {
    await favoriteApi.add(word);
  } else {
    await favoriteApi.remove(word);
  }
}

export const favoriteService = { getList, isFavorite, toggle };
