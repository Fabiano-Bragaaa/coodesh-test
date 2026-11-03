import { supabase } from "@infra";

async function listAfter(afterId: number, size: number) {
  const { data, error } = await supabase
    .from("words")
    .select("id, word")
    .gt("id", afterId)
    .order("id")
    .limit(size);

  if (error) {
    throw error;
  }

  return data;
}

async function neighbors(word: string) {
  const { data, error } = await supabase.rpc("word_neighbors", { p_word: word });

  if (error) {
    throw error;
  }

  return data;
}

export const wordApi = { listAfter, neighbors };
