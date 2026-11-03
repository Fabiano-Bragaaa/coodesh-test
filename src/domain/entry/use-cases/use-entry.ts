import { queryKeys, useAppQuery } from "@infra";

import { entryService } from "../entry-service";

export function useEntry(word: string) {
  return useAppQuery({
    queryKey: queryKeys.entry.one(word),
    queryFn: () => entryService.lookup(word),
    staleTime: Infinity,
  });
}
