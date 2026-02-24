import Image from "next/image"

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pb-24 md:pt-32">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              A Journal of Authentic Voices
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              In the age of AI, genuine human expression is all the more precious
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              We curate and celebrate writing that comes from lived experience, unfiltered emotion, and the irreplaceable depth of the human spirit.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#latest"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
              >
                Read Latest
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-foreground underline underline-offset-4 transition-colors hover:text-primary"
              >
                Our Story
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/images/hero-writing.jpg"
              alt="A person writing in a sunlit journal"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
