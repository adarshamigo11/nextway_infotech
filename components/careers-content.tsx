"use client"

import useSWR from "swr"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { GlassCard } from "@/components/glass-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Briefcase,
  Calendar,
  Users,
  Rocket,
  Heart,
  GraduationCap,
  Loader2,
  FileText,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface Job {
  _id: string
  title: string
  description: string
  location: string
  type: string
  createdAt: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const benefits = [
  {
    icon: Rocket,
    title: "Growth Opportunities",
    description: "Fast-track your career with mentorship and skill development programs.",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description: "Flexible hours and a supportive work environment that values your wellbeing.",
  },
  {
    icon: GraduationCap,
    title: "Learning Culture",
    description: "Access to training, conferences, and resources to keep your skills sharp.",
  },
  {
    icon: Users,
    title: "Collaborative Team",
    description: "Work alongside talented professionals in a team-first culture.",
  },
]

export function CareersContent() {
  const { data: jobs, isLoading } = useSWR<Job[]>("/api/careers", fetcher)

  return (
    <>
      {/* Why Join Us */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Why Join Nextway Infotech"
            subtitle="We invest in our people because they are the foundation of our success."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <GlassCard key={b.title} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <b.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground font-[family-name:var(--font-poppins)]">
                    {b.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {b.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Open Positions"
            subtitle="Find the role that fits your skills and ambitions."
          />

          {isLoading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass rounded-xl p-6">
                  <Skeleton className="mb-2 h-6 w-1/3" />
                  <Skeleton className="mb-4 h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))}
            </div>
          ) : !jobs || !Array.isArray(jobs) || jobs.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground font-[family-name:var(--font-poppins)]">
                No open positions right now
              </h3>
              <p className="max-w-md text-muted-foreground">
                We are always looking for talented people. Send your resume to
                careers@nextwayinfotech.com and we will reach out when a matching
                role opens up.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job, i) => (
                <JobCard key={job._id} job={job} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function JobCard({ job, index }: { job: Job; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        onClick={() => setOpen(true)}
        className="cursor-pointer"
      >
        <GlassCard delay={0}>
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-foreground font-[family-name:var(--font-poppins)]">
                {job.title}
              </h3>
              <Briefcase className="h-5 w-5 text-accent" />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {job.description}
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5" />
                {job.type}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(job.createdAt).toLocaleDateString("en-IN")}
              </span>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              onClick={(e) => {
                e.stopPropagation()
                setOpen(true)
              }}
            >
              View Details
            </Button>
          </div>
        </GlassCard>
      </motion.div>

      <JobDetailsDialog job={job} open={open} onOpenChange={setOpen} />
    </>
  )
}

function JobDetailsDialog({
  job,
  open,
  onOpenChange,
}: {
  job: Job
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-[family-name:var(--font-poppins)]">
            {job.title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2 rounded-md bg-accent/10 px-3 py-1.5">
              <MapPin className="h-4 w-4 text-accent" />
              {job.location}
            </span>
            <span className="flex items-center gap-2 rounded-md bg-accent/10 px-3 py-1.5">
              <Briefcase className="h-4 w-4 text-accent" />
              {job.type}
            </span>
            <span className="flex items-center gap-2 rounded-md bg-accent/10 px-3 py-1.5">
              <Calendar className="h-4 w-4 text-accent" />
              Posted on {new Date(job.createdAt).toLocaleDateString("en-IN")}
            </span>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground font-[family-name:var(--font-poppins)]">
              Job Description
            </h4>
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
              {job.description}
            </div>
          </div>
          
          <ApplyDialog jobId={job._id} jobTitle={job.title} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ApplyDialog({
  jobId,
  jobTitle,
}: {
  jobId: string
  jobTitle: string
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.append("jobId", jobId)

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("Failed to apply")
      toast.success("Application submitted successfully!")
      setOpen(false)
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="shrink-0 bg-accent text-accent-foreground hover:bg-emerald-dark">
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-poppins)]">
            Apply for {jobTitle}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="apply-name">Full Name</Label>
            <Input id="apply-name" name="name" placeholder="Your name" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="apply-phone">Phone Number</Label>
            <Input
              id="apply-phone"
              name="phone"
              placeholder="+91 98765 43210"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="apply-email">Email</Label>
            <Input
              id="apply-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="apply-resume">Resume (PDF)</Label>
            <Input
              id="apply-resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              className="cursor-pointer file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-accent/10 file:px-3 file:py-1 file:text-sm file:text-accent"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="bg-accent text-accent-foreground hover:bg-emerald-dark"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Application
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
