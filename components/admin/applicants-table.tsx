"use client"

import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Applicant {
  _id: string
  name: string
  email: string
  phone: string
  jobTitle: string
  coverLetter: string
  resumeFileId?: string
  createdAt: string
}

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => r.json())

export function ApplicantsTable() {
  const { data, mutate } = useSWR<Applicant[]>(
    "/api/admin/applicants",
    fetcher
  )

  if (!data)
    return <p className="text-muted-foreground font-sans">Loading...</p>

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Card className="border-border/50 bg-card">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground font-sans">
            No applications received yet.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground font-sans">
        Job Applications
      </h2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground font-sans">
                Applicant
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground font-sans">
                Position
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground font-sans">
                Contact
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground font-sans">
                Date
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground font-sans">
                Resume
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground font-sans">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((applicant) => (
              <tr
                key={applicant._id}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 font-sans">
                  <p className="font-medium text-foreground">
                    {applicant.name}
                  </p>
                </td>
                <td className="px-4 py-3 text-muted-foreground font-sans">
                  {applicant.jobTitle}
                </td>
                <td className="px-4 py-3 font-sans">
                  <p className="text-foreground">{applicant.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {applicant.phone}
                  </p>
                </td>
                <td className="px-4 py-3 text-muted-foreground font-sans">
                  {new Date(applicant.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 font-sans">
                  {applicant.resumeFileId ? (
                    <a
                      href={`/api/admin/kyc/${applicant.resumeFileId}/file`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2ECC71] hover:underline text-sm"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="text-muted-foreground text-xs">
                      No file
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={async () => {
                      if (!confirm("Delete this application?")) return
                      await fetch(`/api/admin/applicants/${applicant._id}`, {
                        method: "DELETE",
                        credentials: "include",
                      })
                      mutate()
                    }}
                    className="font-sans"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
