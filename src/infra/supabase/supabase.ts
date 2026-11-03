import "react-native-url-polyfill/auto";

import { createClient } from "@supabase/supabase-js";

import { timedFetch } from "../network/timed-fetch";
import { mmkvStorage } from "../storage/mmkv-storage";

import { type Database } from "./database.types";

function getSupabaseEnv(): { url: string; key: string } {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const key = process.env.EXPO_PUBLIC_SUPABASE_KEY;

  if (!url || !key) {
    throw new Error("Supabase URL or key is not set");
  }

  return { url, key };
}

const { url, key } = getSupabaseEnv();

export const supabase = createClient<Database>(url, key, {
  global: { fetch: timedFetch },
  auth: {
    storage: mmkvStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
