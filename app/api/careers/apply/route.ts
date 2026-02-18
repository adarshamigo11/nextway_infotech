import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { uploadFile } from "@/lib/gridfs"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const jobId = formData.get("jobId") as string
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const resume = formData.get("resume") as File | null

    if (!name || !phone || !email || !jobId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    let resumeFileId: string | null = null
    if (resume && resume.size > 0) {
      if (resume.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Resume file size exceeds 5MB limit" },
          { status: 400 }
        )
      }
      const buffer = Buffer.from(await resume.arrayBuffer())
      const fileId = await uploadFile(
        buffer,
        `resume_${Date.now()}_${resume.name}`,
        resume.type
      )
      resumeFileId = fileId.toString()
    }

    const db = await getDb()
    await db.collection("applicants").insertOne({
      jobId: new ObjectId(jobId),
      name,
      phone,
      email,
      resumeFileId,
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Apply error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
