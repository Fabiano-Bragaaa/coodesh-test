import { useQueryClient } from "@tanstack/react-query";

import { queryKeys, useAppMutation } from "@infra";

import { historyService } from "../history-service";

export function useRecordView(userId: string | undefined) {
  const queryClient = useQueryClient();

  return useAppMutation<void, string>({
    mutationFn: historyService.record,
    quiet: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.history.list(userId) });
    },
  });
}
