"use client"

import useSWR from "swr"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/glass-card"
import { Calendar, ExternalLink, FileText, X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import Image from "next/image"

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  coverImage: string | null
  links: string[]
  imageFileId: string | null
  published: boolean
  createdAt: string
  updatedAt: string
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
  const [open, setOpen] = useState(false)
  const imageUrl = blog.coverImage || (blog.imageFileId ? `/api/blogs/image/${blog.imageFileId}` : null)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
      >
        <GlassCard delay={0}>
          <div 
            className="flex flex-col gap-3 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            {imageUrl && (
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            )}
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
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {blog.excerpt || blog.content.slice(0, 200) + "..."}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>By {blog.author}</span>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              onClick={(e) => {
                e.stopPropagation()
                setOpen(true)
              }}
            >
              Read More
            </Button>
          </div>
        </GlassCard>
      </motion.div>

      <BlogDetailsDialog blog={blog} open={open} onOpenChange={setOpen} />
    </>
  )
}

function BlogDetailsDialog({
  blog,
  open,
  onOpenChange,
}: {
  blog: Blog
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const imageUrl = blog.coverImage || (blog.imageFileId ? `/api/blogs/image/${blog.imageFileId}` : null)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-3xl font-bold text-foreground font-[family-name:var(--font-poppins)] leading-tight">
            {blog.title}
          </DialogTitle>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <span className="font-medium text-foreground">By</span>
              <span className="text-accent font-medium">{blog.author}</span>
            </span>
          </div>
        </DialogHeader>
        
        <div className="flex flex-col gap-6">
          {imageUrl && (
            <div className="relative h-80 w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src={imageUrl}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {blog.excerpt && (
            <div className="bg-accent/5 border-l-4 border-accent p-4 rounded-r-lg">
              <p className="text-lg italic text-foreground/80 leading-relaxed">
                {blog.excerpt}
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-foreground font-[family-name:var(--font-poppins)] border-b border-border pb-2">
              Article Content
            </h4>
            <div className="prose prose-sm max-w-none text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
          
          {blog.links && blog.links.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-border">
              <h4 className="text-lg font-semibold text-foreground font-[family-name:var(--font-poppins)]">
                Related Links
              </h4>
              <div className="flex flex-wrap gap-2">
                {blog.links.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Link {i + 1}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
