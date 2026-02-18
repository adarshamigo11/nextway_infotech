import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  try {
    const db = await getDb()
    const blogs = await db
      .collection("blogs")
      .find({ published: true })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(
      blogs.map((blog) => ({
        _id: blog._id.toString(),
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        author: blog.author || "",
        coverImage: blog.coverImage || null,
        links: blog.links || [],
        imageFileId: blog.imageFileId || null,
        published: blog.published ?? false,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      }))
    )
  } catch (error) {
    console.error("Blogs fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
