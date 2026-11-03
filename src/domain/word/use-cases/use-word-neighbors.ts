import { queryKeys, useAppQuery } from "@infra";

import { wordService } from "../word-service";

export function useWordNeighbors(word: string) {
  return useAppQuery({
    queryKey: queryKeys.words.neighbors(word),
    queryFn: () => wordService.neighbors(word),
    staleTime: Infinity,
  });
}
