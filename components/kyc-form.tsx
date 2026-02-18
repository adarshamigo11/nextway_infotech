"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, FileCheck } from "lucide-react"

const fileFields = [
  { name: "kycForm", label: "KYC Form (PDF/Image)" },
  { name: "panCard", label: "PAN Card (Image)" },
  { name: "aadhaarFront", label: "Aadhaar Card - Front (Image)" },
  { name: "aadhaarBack", label: "Aadhaar Card - Back (Image)" },
  { name: "signature", label: "Signature (Image)" },
]

export function KycForm() {
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<Record<string, File | null>>({})

  function handleFileChange(name: string, file: File | null) {
    setFiles((prev) => ({ ...prev, [name]: file }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Validate required fields
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string

    if (!name || name.length < 2) {
      toast.error("Please enter your full name.")
      return
    }
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid contact number.")
      return
    }

    // Check at least one file is uploaded
    const hasFiles = fileFields.some((f) => files[f.name])
    if (!hasFiles) {
      toast.error("Please upload at least one document.")
      return
    }

    // Append files to formData
    for (const field of fileFields) {
      if (files[field.name]) {
        formData.append(field.name, files[field.name] as File)
      }
    }

    setLoading(true)
    try {
      const res = await fetch("/api/kyc", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("Failed to submit")
      toast.success("KYC documents submitted successfully!")
      // Reset form
      ;(e.target as HTMLFormElement).reset()
      setFiles({})
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="kyc-name">Full Name</Label>
          <Input id="kyc-name" name="name" placeholder="Your full name" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="kyc-phone">Contact Number</Label>
          <Input
            id="kyc-phone"
            name="phone"
            placeholder="+91 98765 43210"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {fileFields.map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <Label htmlFor={`kyc-${field.name}`}>{field.label}</Label>
            <div className="relative">
              <Input
                id={`kyc-${field.name}`}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="cursor-pointer file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-accent/10 file:px-3 file:py-1 file:text-sm file:text-accent"
                onChange={(e) =>
                  handleFileChange(field.name, e.target.files?.[0] || null)
                }
              />
              {files[field.name] ? (
                <FileCheck className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
              ) : (
                <Upload className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              )}
            </div>
          </div>
        ))}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="mt-2 bg-accent text-accent-foreground hover:bg-emerald-dark"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit KYC Documents
      </Button>
    </form>
  )
}
