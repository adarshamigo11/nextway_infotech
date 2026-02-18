"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { GlassCard } from "@/components/glass-card"
import { Target, Eye, Award, Users } from "lucide-react"

const stats = [
  { label: "Years of Experience", value: "5+" },
  { label: "Projects Delivered", value: "100+" },
  { label: "Happy Clients", value: "80+" },
  { label: "Team Members", value: "30+" },
]

const values = [
  {
    icon: Target,
    title: "Innovation",
    description: "We constantly push boundaries to deliver cutting-edge solutions.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Quality is at the core of everything we build and deliver.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work closely with our clients as true technology partners.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Open communication and honest relationships drive our success.",
  },
]

export function AboutContent() {
  return (
    <>
      {/* Company Overview */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                Who We Are
              </h3>
              <h2 className="mt-2 text-3xl font-bold text-foreground font-[family-name:var(--font-poppins)]">
                Building the Future of Business Technology
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Nextway Infotech is a leading financial technology company based in
                Indore, India. We specialize in developing innovative software
                solutions that help businesses automate operations, increase
                efficiency, and achieve sustainable growth.
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                From algorithmic trading platforms to comprehensive school management
                systems, our diverse portfolio reflects our ability to solve complex
                challenges across multiple industries. We are driven by a passion for
                technology and a commitment to delivering exceptional value.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <GlassCard key={stat.label} delay={i * 0.1}>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-accent font-[family-name:var(--font-poppins)]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </GlassCard>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-primary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-primary-foreground/10 p-8"
            >
              <Target className="mb-4 h-8 w-8 text-accent" />
              <h3 className="text-2xl font-bold text-primary-foreground font-[family-name:var(--font-poppins)]">
                Our Mission
              </h3>
              <p className="mt-3 leading-relaxed text-primary-foreground/70">
                To democratize access to powerful financial and business technology,
                enabling organizations of all sizes to compete and thrive in an
                increasingly digital world. We build solutions that are reliable,
                scalable, and affordable.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-xl border border-primary-foreground/10 p-8"
            >
              <Eye className="mb-4 h-8 w-8 text-accent" />
              <h3 className="text-2xl font-bold text-primary-foreground font-[family-name:var(--font-poppins)]">
                Our Vision
              </h3>
              <p className="mt-3 leading-relaxed text-primary-foreground/70">
                To be the leading fintech solutions provider in India, recognized for
                innovation, quality, and client success. We envision a future where
                technology seamlessly integrates into every business operation,
                enabling smarter decisions and faster growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Our Core Values"
            subtitle="The principles that guide everything we do."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <GlassCard key={value.title} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <value.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground font-[family-name:var(--font-poppins)]">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Our Location"
            subtitle="Visit us at our office in Indore, Madhya Pradesh."
          />
          <div className="overflow-hidden rounded-xl shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235527.47970836915!2d75.6985074!3d22.7239227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nextway Infotech Location - Indore, India"
            />
          </div>
        </div>
      </section>
    </>
  )
}
