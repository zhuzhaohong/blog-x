import Link from 'next/link'

import { BlogEditorForm } from '@/components/blog-editor-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export default async function NewBlogPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const authorName =
    user?.user_metadata?.full_name ??
    user?.email?.split('@')[0] ??
    'Anonymous'

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/blogs">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 size-4" />
          Back to Blogs
        </Button>
      </Link>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New Blog Post</h1>
        <p className="mt-1 text-muted-foreground">
          Create a new blog post. The slug is auto-generated from the title.
        </p>
      </div>

      <BlogEditorForm mode="create" defaultAuthor={authorName} />
    </div>
  )
}
