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
import { Trash2 } from "lucide-react"
import { useState } from "react"

interface Contact {
  _id: string
  name: string
  phone: string
  email: string
  message: string
  createdAt: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function DeleteButton({ id, onDelete }: { id: string; onDelete: (id: string) => Promise<void> }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this contact submission?")) return
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

export function ContactsTable() {
  const { data: contacts, isLoading, mutate } = useSWR<Contact[]>(
    "/api/admin/contacts",
    fetcher
  )

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/admin/contacts?id=${id}`, { method: "DELETE" })
    if (response.ok) {
      mutate(contacts?.filter((c) => c._id !== id))
    } else {
      alert("Failed to delete contact")
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">No contact submissions yet.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="hidden md:table-cell">Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact._id}>
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell className="hidden max-w-xs truncate md:table-cell">
                {contact.message}
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-xs">
                  {new Date(contact.createdAt).toLocaleDateString("en-IN")}
                </Badge>
              </TableCell>
              <TableCell>
                <DeleteButton id={contact._id} onDelete={handleDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
