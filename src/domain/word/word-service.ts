import { wordAdapter } from "./word-adapter";
import { wordApi } from "./word-api";
import { type WordNeighbors, type WordPage } from "./word-types";

export const WORD_PAGE_SIZE = 21;
export const FIRST_WORD_CURSOR = 0;

async function listAfter(afterId: number): Promise<WordPage> {
  return wordAdapter.toWordPage(await wordApi.listAfter(afterId, WORD_PAGE_SIZE), WORD_PAGE_SIZE);
}

async function neighbors(word: string): Promise<WordNeighbors> {
  return wordAdapter.toNeighbors(await wordApi.neighbors(word));
}

export const wordService = { listAfter, neighbors };
