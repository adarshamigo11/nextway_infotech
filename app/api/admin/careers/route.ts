import { NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const db = await getDb()
    const careers = await db
      .collection("careers")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(
      careers.map((c) => ({
        _id: c._id.toString(),
        title: c.title,
        department: c.department || "",
        location: c.location || "Indore, India",
        type: c.type || "Full-Time",
        description: c.description,
        requirements: c.requirements || [],
        active: c.active ?? true,
        createdAt: c.createdAt,
      }))
    )
  } catch (error) {
    console.error("Admin careers fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, department, location, type, description, requirements, active } = body

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      )
    }

    const db = await getDb()
    const result = await db.collection("careers").insertOne({
      title,
      department: department || "",
      location: location || "Indore, India",
      type: type || "Full-Time",
      description,
      requirements: requirements || [],
      active: active ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      id: result.insertedId.toString(),
    })
  } catch (error) {
    console.error("Career create error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
