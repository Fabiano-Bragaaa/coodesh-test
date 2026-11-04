import { useQueryClient } from "@tanstack/react-query";

import { queryKeys, useAppMutation } from "@infra";

import { historyService } from "../history-service";

export function useRecordView(userId: string | undefined) {
  const queryClient = useQueryClient();

  function refreshList() {
    queryClient.invalidateQueries({ queryKey: queryKeys.history.list(userId) });
  }

  return useAppMutation<void, string>({
    mutationFn: historyService.record,
    quiet: true,
    onSuccess: refreshList,
  });
}
