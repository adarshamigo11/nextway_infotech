import { NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const db = await getDb()
    const submissions = await db
      .collection("kyc")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(
      submissions.map((s) => ({
        _id: s._id.toString(),
        name: s.name,
        phone: s.phone,
        kycFormFileId: s.kycFormFileId || null,
        panCardFileId: s.panCardFileId || null,
        aadhaarFrontFileId: s.aadhaarFrontFileId || null,
        aadhaarBackFileId: s.aadhaarBackFileId || null,
        signatureFileId: s.signatureFileId || null,
        createdAt: s.createdAt,
      }))
    )
  } catch (error) {
    console.error("KYC fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const db = await getDb()
    const result = await db.collection("kyc").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "KYC entry not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("KYC delete error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
