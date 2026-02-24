"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export default function BlogNewsletter() {
  const [email, setEmail] = useState("")

  return (
    <section className="border-t border-border bg-primary">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/70">
          Newsletter
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-primary-foreground md:text-4xl">
          Stay close to what matters
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/70">
          Receive our favorite essays, updates from contributors, and reflections on writing & living — delivered with care, not frequency.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-sm border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary-foreground/40"
            required
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary-foreground px-6 py-3 text-sm font-medium tracking-wide text-primary transition-opacity hover:opacity-90"
          >
            Subscribe
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  )
}
