import { NextRequest, NextResponse } from "next/server"
import { comparePassword, createToken } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"

// Temporary hardcoded admin for development
const TEMP_ADMIN = {
  username: "admin",
  password: "admin@2026"
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      )
    }

    // Try MongoDB first, fallback to hardcoded admin
    let admin = null
    try {
      const client = await clientPromise
      const db = client.db("nextway_infotech")
      admin = await db.collection("admins").findOne({ username })
    } catch (dbError) {
      console.log("MongoDB connection failed, using fallback admin")
    }

    // Fallback to hardcoded admin if DB fails or user not found
    if (!admin && username === TEMP_ADMIN.username && password === TEMP_ADMIN.password) {
      const token = await createToken()
      const response = NextResponse.json({ success: true })
      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 86400,
        path: "/",
      })
      return response
    }

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const valid = await comparePassword(password, admin.password)
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const token = await createToken()
    const response = NextResponse.json({ success: true })

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
