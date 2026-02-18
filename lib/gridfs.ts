import { MongoClient, GridFSBucket, ObjectId } from "mongodb"
import clientPromise from "./mongodb"

async function getBucket(): Promise<GridFSBucket> {
  const client: MongoClient = await clientPromise
  const db = client.db("nextway_infotech")
  return new GridFSBucket(db)
}

export async function uploadFile(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<ObjectId> {
  const bucket = await getBucket()

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(filename, {
      contentType,
    })

    uploadStream.on("finish", () => {
      resolve(uploadStream.id as ObjectId)
    })

    uploadStream.on("error", (error) => {
      reject(error)
    })

    uploadStream.end(buffer)
  })
}

export async function downloadFile(
  fileId: string
): Promise<{ stream: NodeJS.ReadableStream; filename: string; contentType: string }> {
  const bucket = await getBucket()
  const objectId = new ObjectId(fileId)

  const files = await bucket.find({ _id: objectId }).toArray()
  if (files.length === 0) {
    throw new Error("File not found")
  }

  const file = files[0]
  const stream = bucket.openDownloadStream(objectId)

  return {
    stream: stream as unknown as NodeJS.ReadableStream,
    filename: file.filename,
    contentType: (file.contentType as string) || "application/octet-stream",
  }
}

export async function deleteFile(fileId: string): Promise<void> {
  const bucket = await getBucket()
  await bucket.delete(new ObjectId(fileId))
}
