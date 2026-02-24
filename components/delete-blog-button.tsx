'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { deleteBlog } from '@/lib/actions/blogs'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface DeleteBlogButtonProps {
  id: number
  slug: string
}

export function DeleteBlogButton({ id, slug }: DeleteBlogButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteBlog(id)
      router.push('/blogs')
      router.refresh()
    } catch {
      setIsLoading(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Delete?</span>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Yes'}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowConfirm(false)}
          disabled={isLoading}
        >
          No
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => setShowConfirm(true)}
      aria-label="Delete blog post"
    >
      <Trash2 className="mr-2 size-4" />
      Delete
    </Button>
  )
}
