'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { BlogInsert, BlogUpdate } from '@/types/blog'

export async function getBlogs() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch blogs: ${error.message}`)
  }

  return data
}

export async function getBlogBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    throw new Error(`Failed to fetch blog: ${error.message}`)
  }

  return data
}

export async function getBlogById(id: number) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    throw new Error(`Failed to fetch blog: ${error.message}`)
  }

  return data
}

export async function createBlog(input: BlogInsert) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blogs')
    .insert({
      title: input.title,
      subtitle: input.subtitle ?? null,
      image: input.image ?? null,
      content: input.content ?? null,
      author: input.author,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create blog: ${error.message}`)
  }

  revalidatePath('/blogs')
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/blog')

  return data
}

export async function updateBlog(id: number, input: BlogUpdate) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blogs')
    .update({
      ...(input.title !== undefined && { title: input.title }),
      ...(input.subtitle !== undefined && { subtitle: input.subtitle }),
      ...(input.image !== undefined && { image: input.image }),
      ...(input.content !== undefined && { content: input.content }),
      ...(input.author !== undefined && { author: input.author }),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update blog: ${error.message}`)
  }

  revalidatePath('/blogs')
  revalidatePath(`/blogs/${data.slug}`)
  revalidatePath(`/blogs/${data.slug}/edit`)
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/blog')

  return data
}

export async function deleteBlog(id: number) {
  const supabase = await createClient()

  const { error } = await supabase.from('blogs').delete().eq('id', id)

  if (error) {
    throw new Error(`Failed to delete blog: ${error.message}`)
  }

  revalidatePath('/blogs')
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/blog')
}
