export default function BlogAbout() {
    return (
      <section id="about" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              About
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl text-balance">
              Dedicated to Creativity, Authenticity & the Human Voice
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              Humanly is a space where real stories live. We believe that in an era
              of machine-generated content, the value of genuine human expression
              only increases — like handmade craft in an age of mass production.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              We publish essays, personal reflections, memoir fragments, and
              creative nonfiction that come from lived experience. Every piece here
              carries the fingerprints of its creator — the pauses, the
              imperfections, the irreplaceable texture of a real human life.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <p className="font-serif text-3xl font-semibold text-foreground">
                  120+
                </p>
                <p className="mt-1 text-xs tracking-wide text-muted-foreground">
                  Published Voices
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl font-semibold text-foreground">
                  500+
                </p>
                <p className="mt-1 text-xs tracking-wide text-muted-foreground">
                  Original Essays
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl font-semibold text-foreground">
                  45k
                </p>
                <p className="mt-1 text-xs tracking-wide text-muted-foreground">
                  Monthly Readers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  