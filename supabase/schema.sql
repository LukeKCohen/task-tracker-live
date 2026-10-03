-- Run this once in the Supabase SQL editor.
-- DEMO ONLY: the policies below let anyone with the publishable key read, add
-- and update tasks. They are not production-safe.
create table if not exists public.tasks (
  id bigint generated always as identity primary key,
  title text not null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.tasks enable row level security;

create policy "Anyone can read tasks" on public.tasks
  for select to anon using (true);
create policy "Anyone can add tasks" on public.tasks
  for insert to anon with check (true);
create policy "Anyone can update tasks" on public.tasks
  for update to anon using (true) with check (true);

insert into public.tasks (title, done) values
  ('Create a Supabase project', true),
  ('Deploy to Vercel', false),
  ('Share the live link', false);
