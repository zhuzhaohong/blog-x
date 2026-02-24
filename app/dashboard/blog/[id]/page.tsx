import { redirect } from 'next/navigation'

import { getBlogById } from '@/lib/actions/blogs'

export default async function DashboardBlogIdPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const blog = await getBlogById(parseInt(id, 10))

  if (blog) {
    redirect(`/blogs/${blog.slug}`)
  }

  redirect('/blogs')
}
