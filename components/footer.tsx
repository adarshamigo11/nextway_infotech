"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Blogs", href: "/blogs" },
  { title: "Careers", href: "/careers" },
  { title: "KYC", href: "/kyc" },
  { title: "Contact", href: "/contact" },
]

const serviceLinks = [
  { title: "Algo Trading", href: "/services/algo-trading" },
  { title: "Software Development", href: "/services/software-development" },
  { title: "HRM & Payroll", href: "/services/hrm-payroll" },
  { title: "School Management", href: "/services/school-management" },
  { title: "Tour & Travel", href: "/services/tour-travel" },
  { title: "Law Firm", href: "/services/law-firm" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.JPEG"
                alt="Nextway Infotech"
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
                onError={(e) => {
                  // Fallback to text logo if image fails to load
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.parentElement!.innerHTML = '<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent"><span class="text-sm font-bold text-accent-foreground">NI</span></div>'
                }}
              />
              <span className="text-lg font-bold font-[family-name:var(--font-poppins)]">
                Nextway Infotech
              </span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              Trusted financial technology solutions driving innovation and excellence for businesses worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              Services
            </h3>
            <ul className="flex flex-col gap-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-primary-foreground/70">
                  Indore, Madhya Pradesh, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a
                  href="tel:+919876543210"
                  className="text-sm text-primary-foreground/70 hover:text-accent"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a
                  href="mailto:info@nextwayinfotech.com"
                  className="text-sm text-primary-foreground/70 hover:text-accent"
                >
                  info@nextwayinfotech.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-sm text-primary-foreground/50">
            {new Date().getFullYear()} Nextway Infotech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
