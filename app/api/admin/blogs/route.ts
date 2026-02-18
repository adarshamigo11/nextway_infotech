import { NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const db = await getDb()
    const blogs = await db
      .collection("blogs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(
      blogs.map((b) => ({
        _id: b._id.toString(),
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
        content: b.content,
        author: b.author,
        coverImage: b.coverImage || "",
        published: b.published ?? false,
        createdAt: b.createdAt,
      }))
    )
  } catch (error) {
    console.error("Admin blogs fetch error:", error)
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
    const { title, slug, excerpt, content, author, coverImage, published } =
      body

    if (!title || !slug || !excerpt || !content || !author) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    const db = await getDb()
    const result = await db.collection("blogs").insertOne({
      title,
      slug,
      excerpt,
      content,
      author,
      coverImage: coverImage || "",
      published: published ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      id: result.insertedId.toString(),
    })
  } catch (error) {
    console.error("Blog create error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
