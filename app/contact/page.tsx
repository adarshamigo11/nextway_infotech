import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { ContactForm } from "@/components/contact-form"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Nextway Infotech. We would love to discuss how we can help your business grow with our technology solutions.",
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "Indore, Madhya Pradesh, India",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+91 98765 43210",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "info@nextwayinfotech.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    detail: "Mon - Sat: 9:00 AM - 6:00 PM",
  },
]

export default function ContactPage() {
  return (
    <>
      <HeroSection
        title="Contact Us"
        subtitle="Have a project in mind? Let us discuss how we can help you achieve your goals."
        gradient="navy"
        compact
      />
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-poppins)]">
                Get in Touch
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Fill out the form and our team will get back to you within 24
                hours. You can also reach us directly through the details below.
              </p>
              <div className="flex flex-col gap-4">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <info.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {info.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{info.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="glass rounded-xl p-6 lg:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
