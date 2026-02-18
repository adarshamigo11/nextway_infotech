import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { KycForm } from "@/components/kyc-form"

export const metadata: Metadata = {
  title: "KYC Verification",
  description:
    "Complete your KYC verification with Nextway Infotech. Upload your documents securely.",
}

export default function KycPage() {
  return (
    <>
      <HeroSection
        title="KYC Verification"
        subtitle="Complete your Know Your Customer verification by uploading the required documents below."
        gradient="navy"
        compact
      />
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="glass rounded-xl p-6 lg:p-10">
            <h2 className="mb-2 text-2xl font-bold text-foreground font-[family-name:var(--font-poppins)]">
              Upload Your Documents
            </h2>
            <p className="mb-8 text-muted-foreground">
              Please fill in your details and upload the required documents. All
              files are securely stored and encrypted.
            </p>
            <KycForm />
          </div>
        </div>
      </section>
    </>
  )
}
