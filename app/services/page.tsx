import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { SectionHeading } from "@/components/section-heading"
import { ServicesOverviewGrid } from "@/components/services-overview-grid"

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Nextway Infotech's comprehensive range of technology services including algo trading, software development, HRM, school management, and more.",
}

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        title="Our Services"
        subtitle="Comprehensive technology solutions designed to meet the evolving needs of modern businesses across multiple industries."
        gradient="mixed"
        compact
      />
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="What We Offer"
            subtitle="From algorithmic trading to legal practice management, we build software that transforms businesses."
          />
          <ServicesOverviewGrid />
        </div>
      </section>
    </>
  )
}
