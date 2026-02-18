"use client"

import useSWR from "swr"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/glass-card"
import { Calendar, ExternalLink, FileText } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Blog {
  _id: string
  title: string
  description: string
  links: string[]
  imageFileId: string | null
  createdAt: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function BlogsList() {
  const { data: blogs, isLoading } = useSWR<Blog[]>("/api/blogs", fetcher)

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass rounded-xl p-6">
            <Skeleton className="mb-4 h-40 w-full rounded-lg" />
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    )
  }

  if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground font-[family-name:var(--font-poppins)]">
          No blog posts yet
        </h3>
        <p className="max-w-md text-muted-foreground">
          We are working on some great content. Check back soon for insights on
          technology and innovation.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog, i) => (
        <BlogCard key={blog._id} blog={blog} index={i} />
      ))}
    </div>
  )
}

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const description = blog.description || ""
  const truncated =
    description.length > 200
      ? description.slice(0, 200) + "..."
      : description
  const needsTruncation = description.length > 200

  return (
    <GlassCard delay={index * 0.08}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {new Date(blog.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <h3 className="text-lg font-semibold text-foreground font-[family-name:var(--font-poppins)]">
          {blog.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {expanded ? description : truncated}
        </p>
        {needsTruncation && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-fit text-sm font-medium text-accent hover:text-emerald-dark"
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}
        {blog.links && blog.links.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {blog.links.map((link, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent hover:bg-accent/20"
              >
                <ExternalLink className="h-3 w-3" />
                Link {i + 1}
              </a>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  )
}
