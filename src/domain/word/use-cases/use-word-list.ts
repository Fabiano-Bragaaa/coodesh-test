import { queryKeys, usePaginatedList } from "@infra";

import { wordService } from "../word-service";

export function useWordList() {
  return usePaginatedList(queryKeys.words.list, wordService.getList);
}
