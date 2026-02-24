import Link from 'next/link'

import { getBlogs } from '@/lib/actions/blogs'
import { BlogCard } from '@/components/blog-card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Blogs</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your blog posts. Create, edit, and delete content.
          </p>
        </div>
        <Link href="/blogs/new">
          <Button>
            <Plus className="mr-2 size-4" />
            New Post
          </Button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
          <p className="text-muted-foreground">No blog posts yet.</p>
          <Link href="/blogs/new" className="mt-4">
            <Button>Create your first post</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              excerpt={blog.subtitle ?? blog.content?.replace(/<[^>]*>/g, '').slice(0, 120) ?? ''}
              image={blog.image ?? undefined}
              date={formatDate(blog.created_at)}
              href={`/blogs/${blog.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
