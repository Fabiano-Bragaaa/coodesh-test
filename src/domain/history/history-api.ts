import { type PageParams, supabase } from "@infra";

async function getList({ page, perPage }: PageParams) {
  const from = (page - 1) * perPage;

  const { data, error } = await supabase
    .from("history")
    .select("word")
    .order("viewed_at", { ascending: false })
    .order("word")
    .range(from, from + perPage - 1);

  if (error) {
    throw error;
  }

  return data;
}

async function record(word: string, viewedAt: string): Promise<void> {
  const { error } = await supabase
    .from("history")
    .upsert({ word, viewed_at: viewedAt }, { onConflict: "user_id,word" });

  if (error) {
    throw error;
  }
}

export const historyApi = { getList, record };
