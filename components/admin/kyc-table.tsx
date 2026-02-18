"use client"

import useSWR from "swr"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Trash2 } from "lucide-react"
import { useState } from "react"

interface KycSubmission {
  _id: string
  name: string
  phone: string
  kycFormFileId: string | null
  panCardFileId: string | null
  aadhaarFrontFileId: string | null
  aadhaarBackFileId: string | null
  signatureFileId: string | null
  createdAt: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function DeleteButton({ id, onDelete }: { id: string; onDelete: (id: string) => Promise<void> }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this KYC entry?")) return
    setIsDeleting(true)
    try {
      await onDelete(id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-500 hover:text-red-700 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}

function FileLink({ fileId, label }: { fileId: string | null; label: string }) {
  if (!fileId) return <span className="text-xs text-muted-foreground">--</span>
  return (
    <a
      href={`/api/admin/kyc/${fileId}/file`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-accent hover:text-emerald-dark"
    >
      <Download className="h-3 w-3" />
      {label}
    </a>
  )
}

export function KycTable() {
  const { data: submissions, isLoading, mutate } = useSWR<KycSubmission[]>(
    "/api/admin/kyc",
    fetcher
  )

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/admin/kyc?id=${id}`, { method: "DELETE" })
    if (response.ok) {
      mutate(submissions?.filter((s) => s._id !== id))
    } else {
      alert("Failed to delete KYC entry")
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (!submissions || !Array.isArray(submissions) || submissions.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">No KYC submissions yet.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>KYC Form</TableHead>
            <TableHead>PAN Card</TableHead>
            <TableHead>Aadhaar Front</TableHead>
            <TableHead>Aadhaar Back</TableHead>
            <TableHead>Signature</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((s) => (
            <TableRow key={s._id}>
              <TableCell className="font-medium">{s.name}</TableCell>
              <TableCell>{s.phone}</TableCell>
              <TableCell>
                <FileLink fileId={s.kycFormFileId} label="View" />
              </TableCell>
              <TableCell>
                <FileLink fileId={s.panCardFileId} label="View" />
              </TableCell>
              <TableCell>
                <FileLink fileId={s.aadhaarFrontFileId} label="View" />
              </TableCell>
              <TableCell>
                <FileLink fileId={s.aadhaarBackFileId} label="View" />
              </TableCell>
              <TableCell>
                <FileLink fileId={s.signatureFileId} label="View" />
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-xs">
                  {new Date(s.createdAt).toLocaleDateString("en-IN")}
                </Badge>
              </TableCell>
              <TableCell>
                <DeleteButton id={s._id} onDelete={handleDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
