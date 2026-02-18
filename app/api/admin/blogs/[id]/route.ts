import { NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"
import { uploadFile } from "@/lib/gridfs"
import { ObjectId } from "mongodb"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const formData = await request.formData()
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const author = formData.get("author") as string
    const coverImage = formData.get("coverImage") as string
    const published = formData.get("published") === "true"
    const imageFile = formData.get("image") as File | null

    if (!title || !slug || !excerpt || !content || !author) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    let imageFileId = null
    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer())
      imageFileId = await uploadFile(buffer, imageFile.name, imageFile.type)
    }

    const db = await getDb()
    const updateData: any = {
      title,
      slug,
      excerpt,
      content,
      author,
      coverImage: coverImage || "",
      published,
      updatedAt: new Date(),
    }
    if (imageFileId) {
      updateData.imageFileId = imageFileId
    }

    await db.collection("blogs").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Blog update error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const db = await getDb()
    await db.collection("blogs").deleteOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Blog delete error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
