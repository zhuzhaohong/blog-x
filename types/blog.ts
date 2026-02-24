/**
 * Blog post types matching the blogs table schema.
 */

export interface Blog {
  id: number
  title: string
  slug: string
  subtitle: string | null
  image: string | null
  content: string | null
  author: string
  created_at: string
  updated_at: string
}

export interface BlogInsert {
  title: string
  slug?: string
  subtitle?: string | null
  image?: string | null
  content?: string | null
  author: string
}

export interface BlogUpdate {
  title?: string
  slug?: string
  subtitle?: string | null
  image?: string | null
  content?: string | null
  author?: string
}
