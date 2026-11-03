import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";

import { mmkvStorage } from "../storage/mmkv-storage";

const DAY_MS = 24 * 60 * 60 * 1000;
const CACHE_MAX_AGE = 7 * DAY_MS;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { gcTime: CACHE_MAX_AGE, staleTime: Infinity },
  },
});

export const queryPersister = createAsyncStoragePersister({
  storage: mmkvStorage,
  key: "dictionary-query-cache",
});

export const persistOptions = {
  persister: queryPersister,
  maxAge: CACHE_MAX_AGE,
};
