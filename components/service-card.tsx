"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { GlassCard } from "@/components/glass-card"
import {
  BarChart3,
  Code2,
  Users,
  GraduationCap,
  Plane,
  Scale,
} from "lucide-react"

const services = [
  {
    title: "Algo Trading",
    description:
      "Automated trading strategies powered by advanced algorithms for optimal market performance.",
    icon: BarChart3,
    href: "/services/algo-trading",
  },
  {
    title: "Software Development",
    description:
      "Custom software solutions built with modern technologies to solve complex business challenges.",
    icon: Code2,
    href: "/services/software-development",
  },
  {
    title: "HRM & Payroll",
    description:
      "Streamline your human resource operations and payroll management with our integrated platform.",
    icon: Users,
    href: "/services/hrm-payroll",
  },
  {
    title: "School Management",
    description:
      "Comprehensive school ERP system for managing academics, administration, and communication.",
    icon: GraduationCap,
    href: "/services/school-management",
  },
  {
    title: "Tour & Travel",
    description:
      "End-to-end travel management software for agencies and travel operators.",
    icon: Plane,
    href: "/services/tour-travel",
  },
  {
    title: "Law Firm Management",
    description:
      "Digital case management and workflow solutions tailored for legal professionals.",
    icon: Scale,
    href: "/services/law-firm",
  },
]

export function ServiceCard({
  title,
  description,
  icon: Icon,
  href,
  index,
}: {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  index: number
}) {
  return (
    <Link href={href}>
      <GlassCard delay={index * 0.08}>
        <div className="flex flex-col gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
            <Icon className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground font-[family-name:var(--font-poppins)]">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
          <span className="mt-1 text-sm font-medium text-accent">
            {"Learn more ->"}
          </span>
        </div>
      </GlassCard>
    </Link>
  )
}

export function ServicesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <ServiceCard key={service.href} {...service} index={i} />
      ))}
    </div>
  )
}

export { services }
