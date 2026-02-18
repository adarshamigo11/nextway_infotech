"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { SectionHeading } from "@/components/section-heading"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, BarChart3, LineChart, Shield, Zap, TrendingUp, Code2, Globe, Settings, Users, Clock, Briefcase, GraduationCap, BookOpen, Bus, Plane, FileText, Scale, Gavel } from "lucide-react"
import { getServiceBySlug } from "@/lib/services-data"
import { notFound } from "next/navigation"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3,
  LineChart,
  Shield,
  Zap,
  TrendingUp,
  Code2,
  Globe,
  Settings,
  Users,
  Clock,
  Briefcase,
  GraduationCap,
  BookOpen,
  Bus,
  Plane,
  FileText,
  Scale,
  Gavel,
}

export function ServiceDetailContent({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  return (
    <>
      <HeroSection
        title={service.title}
        subtitle={service.description}
        ctaText="Get a Quote"
        ctaHref="/contact"
        secondaryCta="View All Services"
        secondaryHref="/services"
        gradient="mixed"
        compact
      />

      {/* Description */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              {service.longDescription}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Key Features"
            subtitle="What makes our solution stand out from the competition."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {service.features.map((feature, i) => {
              const FeatureIcon = iconMap[feature.icon.name] || BarChart3
              return (
                <GlassCard key={feature.title} delay={i * 0.1}>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <FeatureIcon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground font-[family-name:var(--font-poppins)]">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                title="Why Choose This Solution"
                subtitle="The tangible benefits your business will experience."
                align="left"
              />
              <ul className="flex flex-col gap-3">
                {service.benefits.map((benefit, i) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6 rounded-2xl bg-primary p-10 text-center"
            >
              <h3 className="text-2xl font-bold text-primary-foreground font-[family-name:var(--font-poppins)]">
                Ready to Get Started?
              </h3>
              <p className="text-primary-foreground/70">
                Contact us today for a free consultation and discover how our{" "}
                {service.shortTitle.toLowerCase()} solution can transform your
                business.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-emerald-dark"
              >
                <Link href="/contact">Contact Us Today</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
