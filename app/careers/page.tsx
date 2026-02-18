import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { CareersContent } from "@/components/careers-content"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Nextway Infotech team. Explore current job openings and build your career in financial technology.",
}

export default function CareersPage() {
  return (
    <>
      <HeroSection
        title="Join Our Team"
        subtitle="Build your career with one of India's fastest-growing fintech companies. Explore current openings below."
        gradient="emerald"
        compact
      />
      <CareersContent />
    </>
  )
}
