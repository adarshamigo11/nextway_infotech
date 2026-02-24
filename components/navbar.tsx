"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  { title: "Algo Trading", href: "/services/algo-trading" },
  { title: "Software Development", href: "/services/software-development" },
  { title: "HRM & Payroll", href: "/services/hrm-payroll" },
  { title: "School Management", href: "/services/school-management" },
  { title: "Tour & Travel", href: "/services/tour-travel" },
  { title: "Law Firm Management", href: "/services/law-firm" },
]

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/services", hasDropdown: true },
  { title: "KYC", href: "/kyc" },
  { title: "Blogs", href: "/blogs" },
  { title: "Careers", href: "/careers" },
  { title: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.JPEG"
            alt="Nextway Infotech"
            width={400}
            height={200}
            className="h-18 w-45 object-contain"
            onError={(e) => {
              // Fallback to text logo if image fails to load
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.parentElement!.innerHTML = '<div class="flex h-16 w-16 items-center justify-center rounded-lg bg-primary"><span class="text-xl font-bold text-primary-foreground">NI</span></div>'
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.title}
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
                >
                  {link.title}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full w-56 rounded-lg border border-border bg-card p-2 shadow-lg"
                    >
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="block rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.title}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                {link.title}
              </Link>
            )
          )}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden bg-accent text-accent-foreground hover:bg-emerald-dark sm:inline-flex">
            <Link href="/contact">Get Started</Link>
          </Button>
          <button
            className="rounded-md p-2 text-foreground lg:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/50 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.title}>
                    <button
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground"
                    >
                      {link.title}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${isMobileServicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isMobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4"
                        >
                          {services.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              onClick={() => setIsMobileOpen(false)}
                              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-accent"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.title}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:text-accent"
                  >
                    {link.title}
                  </Link>
                )
              )}
              <Button asChild size="sm" className="mt-2 bg-accent text-accent-foreground hover:bg-emerald-dark">
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
