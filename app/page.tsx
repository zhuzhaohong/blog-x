import BlogHero from "@/components/hero";
import BlogAbout from "@/components/blog-about";
import BlogFeatured from "@/components/blog-featured";
import BlogFooter from "@/components/blog-footer";
import BlogHeader from "@/components/blog-header";
import BlogMarquee from "@/components/blog-marquee";
import BlogNewsletter from "@/components/blog-newsletter";
import BlogQuote from "@/components/blog-quote";

export default function Home() {
  return (
    <main>
      <BlogHeader />
      <BlogHero />
      <BlogMarquee />
      <BlogFeatured />
      <BlogAbout />
      <BlogQuote />
      <BlogNewsletter />
      <BlogFooter />
    </main>
  );
}
