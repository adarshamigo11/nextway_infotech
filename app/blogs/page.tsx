import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { BlogsList } from "@/components/blogs-list"

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Read the latest insights, news, and thought leadership from Nextway Infotech on financial technology and software development.",
}

export default function BlogsPage() {
  return (
    <>
      <HeroSection
        title="Our Blog"
        subtitle="Insights, updates, and thought leadership from the Nextway Infotech team."
        gradient="navy"
        compact
      />
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <BlogsList />
        </div>
      </section>
    </>
  )
}
