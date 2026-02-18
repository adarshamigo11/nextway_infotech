"use client"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Career {
  _id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
  active: boolean
  createdAt: string
}

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => r.json())

export function CareersManager() {
  const { data, mutate } = useSWR<Career[]>("/api/admin/careers", fetcher)
  const [editing, setEditing] = useState<Career | null>(null)
  const [creating, setCreating] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground font-sans">
          Job Postings
        </h2>
        <Button
          onClick={() => {
            setCreating(true)
            setEditing(null)
          }}
          className="bg-[#2ECC71] text-[#0A1F44] hover:bg-[#27AE60] font-sans"
        >
          + New Posting
        </Button>
      </div>

      {(creating || editing) && (
        <CareerForm
          career={editing}
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
              No job postings yet. Create your first one!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {data.map((career) => (
            <Card key={career._id} className="border-border/50 bg-card">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate font-sans">
                    {career.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans">
                    {career.department} &middot; {career.location} &middot;{" "}
                    {career.type} &middot;{" "}
                    <span
                      className={
                        career.active ? "text-[#2ECC71]" : "text-amber-500"
                      }
                    >
                      {career.active ? "Active" : "Inactive"}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditing(career)
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
                      if (!confirm("Delete this posting?")) return
                      await fetch(`/api/admin/careers/${career._id}`, {
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

function CareerForm({
  career,
  onCancel,
  onSaved,
}: {
  career: Career | null
  onCancel: () => void
  onSaved: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: career?.title ?? "",
    department: career?.department ?? "",
    location: career?.location ?? "",
    type: career?.type ?? "Full-Time",
    description: career?.description ?? "",
    requirements: career?.requirements?.join("\n") ?? "",
    active: career?.active ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        requirements: form.requirements
          .split("\n")
          .map((r) => r.trim())
          .filter(Boolean),
      }
      if (career) {
        await fetch(`/api/admin/careers/${career._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        })
      } else {
        await fetch("/api/admin/careers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
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
          {career ? "Edit Posting" : "New Posting"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-sans text-foreground">Job Title</Label>
              <Input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-background border-border font-sans"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-sans text-foreground">Department</Label>
              <Input
                required
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
                className="bg-background border-border font-sans"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-sans text-foreground">Location</Label>
              <Input
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="bg-background border-border font-sans"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-sans text-foreground">Type</Label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-[#2ECC71]/50"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="font-sans text-foreground">Description</Label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-[#2ECC71]/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-sans text-foreground">
              Requirements (one per line)
            </Label>
            <textarea
              rows={4}
              value={form.requirements}
              onChange={(e) =>
                setForm({ ...form, requirements: e.target.value })
              }
              placeholder="Bachelor's degree in CS or related field&#10;3+ years experience&#10;Strong communication skills"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-[#2ECC71]/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="rounded border-border accent-[#2ECC71]"
            />
            <Label htmlFor="active" className="font-sans text-foreground">
              Active
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#2ECC71] text-[#0A1F44] hover:bg-[#27AE60] font-sans"
            >
              {loading ? "Saving..." : career ? "Update" : "Create"}
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
