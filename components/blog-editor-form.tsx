'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { createBlog, updateBlog } from '@/lib/actions/blogs'
import { BlogEditor } from '@/components/blog-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface BlogEditorFormProps {
  mode: 'create' | 'edit'
  blogId?: number
  defaultAuthor?: string
  defaultValues?: {
    title: string
    subtitle: string
    image: string
    content: string
    author: string
  }
}

export function BlogEditorForm({
  mode,
  blogId,
  defaultAuthor = '',
  defaultValues,
}: BlogEditorFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [title, setTitle] = useState(defaultValues?.title ?? '')
  const [subtitle, setSubtitle] = useState(defaultValues?.subtitle ?? '')
  const [image, setImage] = useState(defaultValues?.image ?? '')
  const [content, setContent] = useState(defaultValues?.content ?? '')
  const [author, setAuthor] = useState(
    defaultValues?.author ?? defaultAuthor ?? ''
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (mode === 'create') {
        const blog = await createBlog({
          title,
          subtitle: subtitle || null,
          image: image || null,
          content: content || null,
          author,
        })
        router.push(`/blogs/${blog.slug}`)
      } else if (blogId) {
        const blog = await updateBlog(blogId, {
          title,
          subtitle: subtitle || null,
          image: image || null,
          content: content || null,
          author,
        })
        router.push(`/blogs/${blog.slug}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === 'create' ? 'Create Post' : 'Edit Post'}
          </CardTitle>
          <CardDescription>
            Fill in the details below. All fields except title and author are
            optional.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div
              className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Optional tagline or subtitle"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Cover Image URL</Label>
            <Input
              id="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author *</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <BlogEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your blog post..."
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : mode === 'create' ? 'Create Post' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
