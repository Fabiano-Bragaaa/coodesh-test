import { useMemo } from "react";

import { queryKeys, useAppInfiniteQuery } from "@infra";

import { FIRST_WORD_CURSOR, wordService } from "../word-service";

export function useWordList() {
  const query = useAppInfiniteQuery({
    queryKey: queryKeys.words.list,
    queryFn: wordService.listAfter,
    initialCursor: FIRST_WORD_CURSOR,
    nextCursor: (page) => page.nextCursor,
    staleTime: Infinity,
  });
  const words = useMemo(() => query.pages.flatMap((page) => page.words), [query.pages]);

  return { ...query, words };
}
