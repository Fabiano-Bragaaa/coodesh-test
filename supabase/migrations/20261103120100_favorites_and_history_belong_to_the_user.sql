create table public.favorites (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  word text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, word)
);

create index favorites_user_created_idx on public.favorites (user_id, created_at desc);

create table public.history (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  word text not null,
  viewed_at timestamptz not null default now(),
  primary key (user_id, word)
);

create index history_user_viewed_idx on public.history (user_id, viewed_at desc);

alter table public.favorites enable row level security;
alter table public.history enable row level security;

create policy "users read their favorites"
  on public.favorites for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "users add their favorites"
  on public.favorites for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "users remove their favorites"
  on public.favorites for delete to authenticated
  using ((select auth.uid()) = user_id);

create policy "users read their history"
  on public.history for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "users add to their history"
  on public.history for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "users refresh their history"
  on public.history for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

grant select, insert, delete on public.favorites to authenticated;
grant select, insert, update on public.history to authenticated;
