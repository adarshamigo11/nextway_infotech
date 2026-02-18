"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroSectionProps {
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  secondaryCta?: string
  secondaryHref?: string
  gradient?: "navy" | "emerald" | "mixed"
  compact?: boolean
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaHref,
  secondaryCta,
  secondaryHref,
  gradient = "mixed",
  compact = false,
}: HeroSectionProps) {
  const gradientMap = {
    navy: "from-primary via-navy-light to-primary",
    emerald: "from-emerald-dark via-accent to-emerald-dark",
    mixed: "from-primary via-navy-light to-emerald-dark",
  }

  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradientMap[gradient]} ${compact ? "py-20" : "py-32 lg:py-44"}`}
    >
      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-balance font-bold text-primary-foreground font-[family-name:var(--font-poppins)] ${compact ? "text-3xl lg:text-4xl" : "text-4xl lg:text-6xl"}`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80"
          >
            {subtitle}
          </motion.p>
        )}

        {(ctaText || secondaryCta) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            {ctaText && ctaHref && (
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-emerald-dark"
              >
                <Link href={ctaHref}>{ctaText}</Link>
              </Button>
            )}
            {secondaryCta && secondaryHref && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                <Link href={secondaryHref}>{secondaryCta}</Link>
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
