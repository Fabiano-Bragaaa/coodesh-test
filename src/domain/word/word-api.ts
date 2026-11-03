import { type PageParams, supabase } from "@infra";

async function getList({ page, perPage }: PageParams) {
  const firstId = (page - 1) * perPage + 1;
  const lastId = page * perPage;

  const { data, error } = await supabase
    .from("words")
    .select("id, word")
    .gte("id", firstId)
    .lte("id", lastId)
    .order("id");

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

export const wordApi = { getList, neighbors };
