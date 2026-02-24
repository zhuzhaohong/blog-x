import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const posts = [
  {
    title: "On Slowness: Why the Best Writing Takes Time",
    excerpt:
      "In a world of instant generation, there is something radical about sitting with an idea for weeks, letting it ferment, evolve, and finally emerge on its own terms.",
    image: "/images/blog-post-1.jpg",
    category: "ESSAY",
    date: "Feb 18, 2026",
    readTime: "8 min read",
  },
  {
    title: "Letters to No One: The Art of Writing Without Audience",
    excerpt:
      "The most honest writing happens when we forget anyone will ever read it. Reclaiming the private, messy, deeply human act of writing for oneself.",
    image: "/images/blog-post-2.jpg",
    category: "PERSONAL",
    date: "Feb 12, 2026",
    readTime: "6 min read",
  },
  {
    title: "The Texture of Experience: What Machines Cannot Feel",
    excerpt:
      "Grief, wonder, the smell of rain on hot pavement. Exploring the sensory and emotional landscape that makes human stories irreplaceable.",
    image: "/images/blog-post-3.jpg",
    category: "REFLECTION",
    date: "Feb 5, 2026",
    readTime: "10 min read",
  },
]

export default function BlogFeatured() {
  return (
    <section id="latest" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Featured
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Latest Stories
          </h2>
        </div>
        <Link
          href="#"
          className="hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:flex"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {posts.map((post, index) => (
          <article key={index} className="group cursor-pointer">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-5 flex items-center gap-3">
              <span className="text-xs font-medium tracking-[0.15em] text-primary">
                {post.category}
              </span>
              <span className="text-xs text-muted-foreground" aria-hidden="true">
                /
              </span>
              <span className="text-xs text-muted-foreground">{post.date}</span>
            </div>
            <h3 className="mt-3 font-serif text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
              {post.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
            <p className="mt-4 text-xs font-medium text-muted-foreground">
              {post.readTime}
            </p>
          </article>
        ))}
      </div>
      <Link
        href="#"
        className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:hidden"
      >
        View all
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}
