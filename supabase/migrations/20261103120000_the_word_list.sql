create table public.words (
  id integer primary key,
  word text not null unique
);

alter table public.words enable row level security;

create policy "anyone reads the word list"
  on public.words for select
  to anon, authenticated
  using (true);

grant select on public.words to anon, authenticated;
