import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  try {
    const db = await getDb()
    const blogs = await db
      .collection("blogs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(
      blogs.map((blog) => ({
        _id: blog._id.toString(),
        title: blog.title,
        description: blog.description,
        links: blog.links || [],
        imageFileId: blog.imageFileId || null,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      }))
    )
  } catch (error) {
    console.error("Blogs fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
