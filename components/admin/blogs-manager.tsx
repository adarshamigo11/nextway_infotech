"use client"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  coverImage: string
  published: boolean
  createdAt: string
}

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => r.json())

export function BlogsManager() {
  const { data, mutate } = useSWR<Blog[]>("/api/admin/blogs", fetcher)
  const [editing, setEditing] = useState<Blog | null>(null)
  const [creating, setCreating] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground font-sans">
          Blog Posts
        </h2>
        <Button
          onClick={() => {
            setCreating(true)
            setEditing(null)
          }}
          className="bg-[#2ECC71] text-[#0A1F44] hover:bg-[#27AE60] font-sans"
        >
          + New Post
        </Button>
      </div>

      {(creating || editing) && (
        <BlogForm
          blog={editing}
          onCancel={() => {
            setCreating(false)
            setEditing(null)
          }}
          onSaved={() => {
            setCreating(false)
            setEditing(null)
            mutate()
          }}
        />
      )}

      {!data ? (
        <p className="text-muted-foreground font-sans">Loading...</p>
      ) : !Array.isArray(data) || data.length === 0 ? (
        <Card className="border-border/50 bg-card">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground font-sans">
              No blog posts yet. Create your first one!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {data.map((blog) => (
            <Card key={blog._id} className="border-border/50 bg-card">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate font-sans">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans">
                    By {blog.author} &middot;{" "}
                    {new Date(blog.createdAt).toLocaleDateString()} &middot;{" "}
                    <span
                      className={
                        blog.published ? "text-[#2ECC71]" : "text-amber-500"
                      }
                    >
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditing(blog)
                      setCreating(false)
                    }}
                    className="font-sans"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={async () => {
                      if (!confirm("Delete this post?")) return
                      await fetch(`/api/admin/blogs/${blog._id}`, {
                        method: "DELETE",
                        credentials: "include",
                      })
                      mutate()
                    }}
                    className="font-sans"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function BlogForm({
  blog,
  onCancel,
  onSaved,
}: {
  blog: Blog | null
  onCancel: () => void
  onSaved: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: blog?.title ?? "",
    slug: blog?.slug ?? "",
    excerpt: blog?.excerpt ?? "",
    content: blog?.content ?? "",
    author: blog?.author ?? "",
    coverImage: blog?.coverImage ?? "",
    published: blog?.published ?? false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (blog) {
        await fetch(`/api/admin/blogs/${blog._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        })
      } else {
        await fetch("/api/admin/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        })
      }
      onSaved()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-[#2ECC71]/30 bg-card">
      <CardHeader>
        <CardTitle className="font-sans text-foreground">
          {blog ? "Edit Post" : "New Post"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-sans text-foreground">Title</Label>
              <Input
                required
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, ""),
                  })
                }
                className="bg-background border-border font-sans"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-sans text-foreground">Slug</Label>
              <Input
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="bg-background border-border font-sans"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-sans text-foreground">Author</Label>
              <Input
                required
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="bg-background border-border font-sans"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-sans text-foreground">
                Cover Image URL
              </Label>
              <Input
                value={form.coverImage}
                onChange={(e) =>
                  setForm({ ...form, coverImage: e.target.value })
                }
                placeholder="https://..."
                className="bg-background border-border font-sans"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="font-sans text-foreground">Excerpt</Label>
            <textarea
              required
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-[#2ECC71]/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-sans text-foreground">Content</Label>
            <textarea
              required
              rows={8}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-[#2ECC71]/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) =>
                setForm({ ...form, published: e.target.checked })
              }
              className="rounded border-border accent-[#2ECC71]"
            />
            <Label htmlFor="published" className="font-sans text-foreground">
              Published
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#2ECC71] text-[#0A1F44] hover:bg-[#27AE60] font-sans"
            >
              {loading ? "Saving..." : blog ? "Update" : "Create"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="font-sans"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
