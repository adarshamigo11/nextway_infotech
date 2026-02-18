"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: "left" | "center"
  light?: boolean
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2
        className={`text-balance text-3xl font-bold font-[family-name:var(--font-poppins)] lg:text-4xl ${light ? "text-primary-foreground" : "text-foreground"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-3 max-w-2xl text-pretty leading-relaxed ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}
        >
          {subtitle}
        </p>
      )}
      <div className={`mx-auto mt-4 h-1 w-16 rounded-full bg-accent ${align === "left" ? "mx-0" : ""}`} />
    </motion.div>
  )
}
