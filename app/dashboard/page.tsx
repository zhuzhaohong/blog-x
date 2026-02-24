import Link from 'next/link'

import { getBlogs } from '@/lib/actions/blogs'
import { BlogCard } from '@/components/blog-card'
import { Button } from '@/components/ui/button'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default async function DashboardHomePage() {
  const blogs = await getBlogs()
  const recentBlogs = blogs.slice(0, 6)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s what&apos;s new in your dashboard.
        </p>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">Recent Posts</h2>
          <Link href="/blogs">
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </Link>
        </div>
        {recentBlogs.length === 0 ? (
          <p className="text-muted-foreground">No blog posts yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {recentBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                title={blog.title}
                excerpt={
                  blog.subtitle ??
                  blog.content?.replace(/<[^>]*>/g, '').slice(0, 120) ??
                  ''
                }
                image={blog.image ?? undefined}
                date={formatDate(blog.created_at)}
                href={`/blogs/${blog.slug}`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
