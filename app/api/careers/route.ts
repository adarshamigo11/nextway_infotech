import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  try {
    const db = await getDb()
    const careers = await db
      .collection("careers")
      .find({ active: true })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(
      careers.map((c) => ({
        _id: c._id.toString(),
        title: c.title,
        department: c.department || "",
        description: c.description,
        location: c.location || "Indore, India",
        type: c.type || "Full-Time",
        requirements: c.requirements || [],
        createdAt: c.createdAt,
      }))
    )
  } catch (error) {
    console.error("Careers fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
