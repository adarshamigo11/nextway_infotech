import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { AboutContent } from "@/components/about-content"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Nextway Infotech - a leading financial technology company building innovative software solutions for businesses across multiple industries.",
}

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title="About Nextway Infotech"
        subtitle="We are building the future of business technology through innovation, excellence, and a deep commitment to our clients' success."
        gradient="navy"
        compact
      />
      <AboutContent />
    </>
  )
}
