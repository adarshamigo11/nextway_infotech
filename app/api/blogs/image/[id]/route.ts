import { NextRequest, NextResponse } from "next/server"
import { downloadFile } from "@/lib/gridfs"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { stream, filename, contentType } = await downloadFile(id)

    return new NextResponse(stream as unknown as ReadableStream, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Image download error:", error)
    return NextResponse.json({ error: "Image not found" }, { status: 404 })
  }
}
