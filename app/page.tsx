"use client"

import { motion } from "framer-motion"
import { HeroSection } from "@/components/hero-section"
import { SectionHeading } from "@/components/section-heading"
import { ServicesGrid } from "@/components/service-card"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { GlassCard } from "@/components/glass-card"
import { Shield, Zap, HeartHandshake, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Trusted Expertise",
    description:
      "Years of experience delivering secure and reliable fintech solutions to businesses of all sizes.",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Technology",
    description:
      "We leverage the latest frameworks and tools to build high-performance, scalable applications.",
  },
  {
    icon: HeartHandshake,
    title: "Client-First Approach",
    description:
      "Every solution is tailored to your unique business needs with dedicated support at every step.",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description:
      "Our solutions have helped businesses achieve measurable growth and operational efficiency.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        title="Trusted Financial Technology Solutions"
        subtitle="Nextway Infotech delivers innovative software solutions for trading, HR management, education, travel, and legal operations. Empowering businesses with technology that works."
        ctaText="Explore Services"
        ctaHref="/services"
        secondaryCta="Contact Us"
        secondaryHref="/contact"
      />

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Why Choose Nextway Infotech"
            subtitle="We combine deep domain expertise with modern technology to deliver solutions that drive real business outcomes."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <GlassCard key={feature.title} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                    <feature.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground font-[family-name:var(--font-poppins)]">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-primary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                Our Mission
              </h3>
              <h2 className="mt-2 text-3xl font-bold text-primary-foreground font-[family-name:var(--font-poppins)]">
                Empowering Businesses Through Innovation
              </h2>
              <p className="mt-4 leading-relaxed text-primary-foreground/70">
                Our mission is to democratize access to powerful financial and
                business technology. We believe every organization, regardless of
                size, deserves world-class software solutions that are reliable,
                scalable, and affordable. We are committed to building long-term
                partnerships and delivering transformative technology.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                Our Vision
              </h3>
              <h2 className="mt-2 text-3xl font-bold text-primary-foreground font-[family-name:var(--font-poppins)]">
                Leading the Future of FinTech
              </h2>
              <p className="mt-4 leading-relaxed text-primary-foreground/70">
                We envision a future where technology seamlessly integrates into
                every business operation, enabling smarter decisions, faster
                growth, and unprecedented efficiency. Nextway Infotech strives to
                be at the forefront of this transformation, shaping industries
                through innovation and excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Our Services"
            subtitle="Comprehensive technology solutions designed to meet the evolving needs of modern businesses."
          />
          <ServicesGrid />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Hear from the businesses that have transformed their operations with our solutions."
          />
          <TestimonialCarousel />
        </div>
      </section>
    </>
  )
}
