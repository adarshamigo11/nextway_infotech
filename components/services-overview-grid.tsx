"use client"

import Link from "next/link"
import { GlassCard } from "@/components/glass-card"
import { servicesData } from "@/lib/services-data"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ServicesOverviewGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {servicesData.map((service, i) => (
        <GlassCard key={service.slug} delay={i * 0.08}>
          <div className="flex flex-col gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
              <service.icon className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground font-[family-name:var(--font-poppins)]">
              {service.shortTitle}
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              {service.description}
            </p>
            <Button
              asChild
              variant="ghost"
              className="w-fit gap-2 px-0 text-accent hover:bg-transparent hover:text-emerald-dark"
            >
              <Link href={`/services/${service.slug}`}>
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </GlassCard>
      ))}
    </div>
  )
}
