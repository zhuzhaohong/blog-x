-- Migration: Create blogs table
-- Purpose: Store blog posts with slug-based routing for the blog management module
-- Affected: Creates public.blogs table, slug generation trigger, RLS policies
-- Considerations: Slug is auto-generated from title; RLS allows public read, authenticated write

-- Create blogs table with all required columns
create table public.blogs (
  id bigint generated always as identity primary key,
  title text not null,
  slug text not null default '' unique,
  subtitle text,
  image text,
  content text,
  author text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.blogs is 'Blog posts for the blog management module. Supports full CRUD with slug-based routing.';

comment on column public.blogs.title is 'Blog post title.';
comment on column public.blogs.slug is 'URL-friendly identifier, auto-generated from title.';
comment on column public.blogs.subtitle is 'Optional subtitle or tagline.';
comment on column public.blogs.image is 'URL to cover image.';
comment on column public.blogs.content is 'Rich text content from TipTap editor (HTML/JSON).';
comment on column public.blogs.author is 'Author display name.';
comment on column public.blogs.created_at is 'Timestamp when the post was created.';
comment on column public.blogs.updated_at is 'Timestamp when the post was last updated.';

-- Index on slug for fast lookups in slug-based routing
create index blogs_slug_idx on public.blogs using btree (slug);

-- Index on created_at for chronological listing
create index blogs_created_at_idx on public.blogs using btree (created_at desc);

-- Function: Generate URL-friendly slug from text
-- Converts to lowercase, replaces spaces with hyphens, removes non-alphanumeric chars
-- exclude_id: when provided (on update), excludes that row from uniqueness check
create or replace function public.slugify(input_text text, exclude_id bigint default null)
returns text
language plpgsql
security invoker
set search_path = ''
as $$
declare
  base_slug text;
  final_slug text;
  suffix int := 0;
begin
  if input_text is null or trim(input_text) = '' then
    return null;
  end if;

  -- Normalize: lowercase, replace spaces/slashes with hyphens, remove special chars
  base_slug := lower(trim(input_text));
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
  base_slug := regexp_replace(base_slug, '/', '-', 'g');
  base_slug := regexp_replace(base_slug, '[^a-z0-9-]', '', 'g');
  base_slug := regexp_replace(base_slug, '-+', '-', 'g');
  base_slug := trim(both '-' from base_slug);

  if base_slug = '' then
    base_slug := 'post';
  end if;

  final_slug := base_slug;

  -- Ensure uniqueness; exclude current row when updating
  while exists (
    select 1 from public.blogs
    where public.blogs.slug = final_slug
    and (exclude_id is null or public.blogs.id != exclude_id)
  ) loop
    suffix := suffix + 1;
    final_slug := base_slug || '-' || suffix;
  end loop;

  return final_slug;
end;
$$;

comment on function public.slugify(text, bigint) is 'Generates a URL-friendly slug from text. Ensures uniqueness within blogs table. exclude_id excludes that row (for updates).';

-- Trigger function: Set slug from title on insert, update updated_at on modify
create or replace function public.handle_blog_slug_and_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  -- On insert: generate slug from title if not provided
  if tg_op = 'INSERT' then
    if new.slug is null or trim(new.slug) = '' then
      new.slug := public.slugify(new.title, null);
    end if;
  end if;

  -- On update: regenerate slug if title changed
  if tg_op = 'UPDATE' and old.title is distinct from new.title then
    new.slug := public.slugify(new.title, new.id);
  end if;

  -- Always update updated_at on modify
  if tg_op in ('INSERT', 'UPDATE') then
    new.updated_at := now();
  end if;

  return new;
end;
$$;

comment on function public.handle_blog_slug_and_updated_at() is 'Auto-generates slug from title and sets updated_at on blog inserts/updates.';

-- Attach trigger to blogs table
create trigger handle_blog_slug_and_updated_at_trigger
  before insert or update on public.blogs
  for each row
  execute function public.handle_blog_slug_and_updated_at();

-- Enable RLS; access controlled by policies
alter table public.blogs enable row level security;

-- RLS Policy: Anyone (anon + authenticated) can read published blogs for public display
create policy "Blogs are viewable by everyone"
  on public.blogs
  for select
  to anon
  using (true);

create policy "Authenticated users can view blogs"
  on public.blogs
  for select
  to authenticated
  using (true);

-- RLS Policy: Only authenticated users can create blogs
create policy "Authenticated users can create blogs"
  on public.blogs
  for insert
  to authenticated
  with check (true);

-- RLS Policy: Only authenticated users can update blogs
create policy "Authenticated users can update blogs"
  on public.blogs
  for update
  to authenticated
  using (true)
  with check (true);

-- RLS Policy: Only authenticated users can delete blogs
create policy "Authenticated users can delete blogs"
  on public.blogs
  for delete
  to authenticated
  using (true);
