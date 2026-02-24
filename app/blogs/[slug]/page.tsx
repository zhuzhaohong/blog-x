import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getBlogBySlug } from '@/lib/actions/blogs'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { DeleteBlogButton } from '@/components/delete-blog-button'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/blogs">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 size-4" />
            Back to Blogs
          </Button>
        </Link>
        <div className="flex gap-2">
          <Link href={`/blogs/${blog.slug}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 size-4" />
              Edit
            </Button>
          </Link>
          <DeleteBlogButton id={blog.id} slug={blog.slug} />
        </div>
      </div>

      <article>
        {blog.image && (
          <div className="relative mb-6 aspect-video overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.image}
              alt={blog.title}
              className="size-full object-cover"
            />
          </div>
        )}
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">{blog.title}</h1>
          {blog.subtitle && (
            <p className="mt-2 text-lg text-muted-foreground">{blog.subtitle}</p>
          )}
          <p className="mt-2 text-sm text-muted-foreground">
            By {blog.author} · {formatDate(blog.created_at)}
          </p>
        </header>
        <div
          className="[&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-medium [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_a]:text-primary [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: blog.content ?? '' }}
        />
      </article>
    </div>
  )
}
