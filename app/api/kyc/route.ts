import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { uploadFile } from "@/lib/gridfs"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }
    if (!phone || phone.length < 10) {
      return NextResponse.json({ error: "Valid phone number is required" }, { status: 400 })
    }

    const fileFields = ["kycForm", "panCard", "aadhaarFront", "aadhaarBack", "signature"]
    const fileIds: Record<string, string | null> = {}

    for (const field of fileFields) {
      const file = formData.get(field) as File | null
      if (file && file.size > 0) {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json(
            { error: `${field} file size exceeds 5MB limit` },
            { status: 400 }
          )
        }
        const buffer = Buffer.from(await file.arrayBuffer())
        const fileId = await uploadFile(buffer, `kyc_${field}_${Date.now()}_${file.name}`, file.type)
        fileIds[`${field}FileId`] = fileId.toString()
      } else {
        fileIds[`${field}FileId`] = null
      }
    }

    const db = await getDb()
    await db.collection("kyc").insertOne({
      name,
      phone,
      ...fileIds,
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("KYC submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
