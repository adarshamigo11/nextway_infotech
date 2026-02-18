import { NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const db = await getDb()
    const applicants = await db
      .collection("applicants")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(
      applicants.map((a) => ({
        _id: a._id.toString(),
        jobId: a.jobId?.toString() || "",
        name: a.name,
        phone: a.phone,
        email: a.email,
        resumeFileId: a.resumeFileId || null,
        createdAt: a.createdAt,
      }))
    )
  } catch (error) {
    console.error("Applicants fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
