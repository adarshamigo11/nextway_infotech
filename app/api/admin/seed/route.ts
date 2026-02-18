import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { hashPassword } from "@/lib/auth"

export async function POST() {
  try {
    const client = await clientPromise
    const db = client.db("nextway_infotech")
    const existing = await db.collection("admins").findOne({ username: "admin" })
    if (existing) {
      return NextResponse.json({ message: "Admin user already exists" })
    }
    const hashed = await hashPassword("admin@2026")
    await db.collection("admins").insertOne({
      username: "admin",
      password: hashed,
      createdAt: new Date(),
    })
    return NextResponse.json({ message: "Admin user created. Username: admin, Password: admin@2026" })
  } catch {
    return NextResponse.json({ error: "Failed to seed admin" }, { status: 500 })
  }
}
