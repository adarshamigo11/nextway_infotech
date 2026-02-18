"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "CEO, TradeTech Solutions",
    quote:
      "Nextway Infotech transformed our trading operations with their algo trading platform. The performance improvements exceeded all our expectations.",
  },
  {
    name: "Priya Mehta",
    role: "Director, EduVision Academy",
    quote:
      "The school management system is incredibly comprehensive. It has streamlined our entire administration process and improved parent communication significantly.",
  },
  {
    name: "Anil Verma",
    role: "Managing Partner, Verma & Associates",
    quote:
      "Their law firm management software has digitized our entire case workflow. We can now track every case detail with remarkable efficiency.",
  },
  {
    name: "Sunita Patel",
    role: "HR Head, GlobalCorp India",
    quote:
      "The HRM and payroll system saved us countless hours every month. The automation is seamless and the support team is always responsive.",
  },
  {
    name: "Vikram Singh",
    role: "Founder, WanderLust Travels",
    quote:
      "Nextway built a tour and travel management platform that perfectly fits our business model. Booking management has never been this smooth.",
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-2xl glass p-8 lg:p-12">
        <Quote className="mb-4 h-8 w-8 text-accent/40" />
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
          >
            <blockquote className="text-lg leading-relaxed text-foreground lg:text-xl">
              {`"${testimonials[current].quote}"`}
            </blockquote>
            <div className="mt-6">
              <p className="font-semibold text-foreground font-[family-name:var(--font-poppins)]">
                {testimonials[current].name}
              </p>
              <p className="text-sm text-muted-foreground">
                {testimonials[current].role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-accent" : "w-2 bg-border"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
