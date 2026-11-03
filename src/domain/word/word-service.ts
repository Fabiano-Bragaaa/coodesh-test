import { type Page, pageAdapter } from "@infra";

import { wordAdapter } from "./word-adapter";
import { wordApi } from "./word-api";
import { type Word, type WordNeighbors } from "./word-types";

const WORDS_PER_PAGE = 21;

async function getList(page: number): Promise<Page<Word>> {
  const params = { page, perPage: WORDS_PER_PAGE };

  return pageAdapter.toPage(await wordApi.getList(params), params, wordAdapter.toWord);
}

async function neighbors(word: string): Promise<WordNeighbors> {
  return wordAdapter.toNeighbors(await wordApi.neighbors(word));
}

export const wordService = { getList, neighbors };
