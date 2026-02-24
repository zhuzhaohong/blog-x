import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl font-semibold tracking-tight text-foreground">
          Humanly
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#"
            className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            Essays
          </Link>
          <Link
            href="#"
            className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            Stories
          </Link>
          <Link
            href="#"
            className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden border-primary text-primary hover:bg-primary hover:text-primary-foreground md:inline-flex">
            Subscribe
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
