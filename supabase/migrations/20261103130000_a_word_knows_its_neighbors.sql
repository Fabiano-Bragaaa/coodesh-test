create function public.word_neighbors(p_word text)
returns table (previous text, next text)
language sql
stable
set search_path = ''
as $$
  select
    (select w.word from public.words w where w.id = current_word.id - 1),
    (select w.word from public.words w where w.id = current_word.id + 1)
  from public.words current_word
  where current_word.word = p_word;
$$;

grant execute on function public.word_neighbors(text) to anon, authenticated;
