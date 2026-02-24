export default function BlogQuote() {
    return (
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
          <blockquote>
            <p className="font-serif text-2xl font-medium italic leading-relaxed text-foreground md:text-3xl lg:text-4xl text-balance">
              {'"'}The stories that matter most are the ones no algorithm could predict
              — born from the quiet, imperfect, deeply personal act of putting
              truth into words.{'"'}
            </p>
          </blockquote>
          <div className="mt-8 flex flex-col items-center gap-1">
            <p className="text-sm font-medium text-foreground">The Editors</p>
            <p className="text-xs tracking-wide text-muted-foreground">
              Humanly Journal
            </p>
          </div>
        </div>
      </section>
    )
  }
  