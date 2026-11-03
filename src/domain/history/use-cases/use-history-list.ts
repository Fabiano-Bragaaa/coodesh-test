import { queryKeys, usePaginatedList } from "@infra";

import { historyService } from "../history-service";

export function useHistoryList(userId: string | undefined) {
  return usePaginatedList(queryKeys.history.list(userId), historyService.getList);
}
