-- Migration: Create profiles table
-- Purpose: Store extended user information linked to auth.users
-- Affected: Creates public.profiles table, trigger on auth.users, RLS policies
-- Considerations: Trigger runs with SECURITY DEFINER to bypass RLS during signup

-- Create profiles table with columns for extended user data
create table public.profiles (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade unique,
  first_name text,
  avatar_url text,
  email text not null
);

comment on table public.profiles is 'Extended user profile data linked to auth.users. One profile per user, created automatically on signup.';

-- Index on user_id for RLS policy performance (used in USING clauses)
create index profiles_user_id_idx on public.profiles using btree (user_id);

-- Enable RLS; all access is restricted by policies
alter table public.profiles enable row level security;

-- RLS Policy: Authenticated users can select only their own profile
create policy "Users can view their own profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- RLS Policy: No user insert (profiles are created by trigger only)
-- Authenticated users cannot insert to prevent duplicate profiles
-- Note: Trigger uses SECURITY DEFINER and bypasses RLS

-- RLS Policy: Authenticated users can update only their own profile
create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- RLS Policy: Authenticated users can delete only their own profile
create policy "Users can delete their own profile"
  on public.profiles
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- Trigger function: Create profile when a new user signs up
-- Uses SECURITY DEFINER so the insert bypasses RLS (trigger runs before user session exists)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id, email)
  values (new.id, new.email);
  return new;
end;
$$;

comment on function public.handle_new_user() is 'Creates a profile record when a new user signs up. Runs as SECURITY DEFINER to bypass RLS.';

-- Attach trigger to auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
