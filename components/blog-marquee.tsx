"use client"

export default function BlogMarquee() {
  const items = [
    "ESSAYS",
    "POETRY",
    "MEMOIR",
    "FICTION",
    "PERSONAL STORIES",
    "LETTERS",
    "REFLECTIONS",
    "CREATIVE NONFICTION",
  ]

  return (
    <div className="overflow-hidden border-y border-border bg-primary py-3">
      <div className="flex animate-marquee gap-8">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-8 text-xs font-medium tracking-[0.25em] text-primary-foreground"
          >
            {item}
            <span className="text-primary-foreground/40" aria-hidden="true">
              +++
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
