import { type Page, pageAdapter } from "@infra";

import { historyAdapter } from "./history-adapter";
import { historyApi } from "./history-api";
import { type HistoryEntry } from "./history-types";

const HISTORY_PER_PAGE = 21;

async function getList(page: number): Promise<Page<HistoryEntry>> {
  const params = { page, perPage: HISTORY_PER_PAGE };

  return pageAdapter.toPage(await historyApi.getList(params), params, historyAdapter.toEntry);
}

async function record(word: string): Promise<void> {
  await historyApi.record(word, new Date().toISOString());
}

export const historyService = { getList, record };
