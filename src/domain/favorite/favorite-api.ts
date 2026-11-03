import { type PageParams, supabase } from "@infra";

async function getList({ page, perPage }: PageParams) {
  const from = (page - 1) * perPage;

  const { data, error } = await supabase
    .from("favorites")
    .select("word")
    .order("created_at", { ascending: false })
    .order("word")
    .range(from, from + perPage - 1);

  if (error) {
    throw error;
  }

  return data;
}

async function findOne(word: string) {
  const { data, error } = await supabase.from("favorites").select("word").eq("word", word).maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

async function add(word: string): Promise<void> {
  const { error } = await supabase.from("favorites").upsert({ word }, { ignoreDuplicates: true });

  if (error) {
    throw error;
  }
}

async function remove(word: string): Promise<void> {
  const { error } = await supabase.from("favorites").delete().eq("word", word);

  if (error) {
    throw error;
  }
}

export const favoriteApi = { getList, findOne, add, remove };
