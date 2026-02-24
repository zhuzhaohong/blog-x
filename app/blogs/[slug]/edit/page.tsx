import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getBlogBySlug } from '@/lib/actions/blogs'
import { BlogEditorForm } from '@/components/blog-editor-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default async function EditBlogPage({
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
      <Link href={`/blogs/${blog.slug}`}>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 size-4" />
          Back to Post
        </Button>
      </Link>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Edit Blog Post</h1>
        <p className="mt-1 text-muted-foreground">
          Update the content below. The slug updates automatically when you
          change the title.
        </p>
      </div>

      <BlogEditorForm
        mode="edit"
        blogId={blog.id}
        defaultValues={{
          title: blog.title,
          subtitle: blog.subtitle ?? '',
          image: blog.image ?? '',
          content: blog.content ?? '',
          author: blog.author,
        }}
      />
    </div>
  )
}
