import { NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { deleteFile } from "@/lib/gridfs"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const db = await getDb()
    const applicant = await db
      .collection("applicants")
      .findOne({ _id: new ObjectId(id) })

    if (applicant?.resumeFileId) {
      try {
        await deleteFile(applicant.resumeFileId)
      } catch {
        // Ignore
      }
    }

    await db.collection("applicants").deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Applicant delete error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
