import Image from 'next/image'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface BlogCardProps {
  title: string
  excerpt: string
  image?: string
  category?: string
  date?: string
  readTime?: string
  href?: string
  className?: string
}

export function BlogCard({
  title,
  excerpt,
  image = '/images/hero-writing.jpg',
  category,
  date,
  readTime,
  href = '#',
  className,
}: BlogCardProps) {
  const content = (
    <Card
      className={cn(
        'group overflow-hidden transition-colors hover:border-primary/30 gap-3 py-3',
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
        />
      </div>
      <CardHeader className="space-y-1 px-3 pt-0">
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          {category && (
            <span className="font-medium tracking-wider text-primary">
              {category}
            </span>
          )}
          {category && date && (
            <span aria-hidden="true">/</span>
          )}
          {date && <span>{date}</span>}
        </div>
        <CardTitle className="line-clamp-2 text-sm font-medium transition-colors group-hover:text-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pt-0">
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {excerpt}
        </p>
      </CardContent>
      {readTime && (
        <CardFooter className="px-3 pt-0 text-[10px] text-muted-foreground">
          {readTime}
        </CardFooter>
      )}
    </Card>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}
