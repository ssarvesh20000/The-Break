import BlogModel from "@/lib/models/BlogModels";
import { ConnectDB } from "@/lib/mongo";
import { NextResponse, NextRequest } from "next/server";
import { getBucket } from '@/lib/mongo'; // Adjust based on your project structure
import { ObjectId } from 'mongodb';
import { read } from "fs";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await ConnectDB();
  const { id } = params;

  try {
    console.log("Fetching image with ID:", id);
    const bucket = getBucket();

    // Convert the string ID to ObjectId
    const objectId = new ObjectId(id);

    // Open a download stream from GridFS
    const downloadStream = bucket.openDownloadStream(objectId);

    // Create a readable stream for the image
    const readableStream = new ReadableStream({
      start(controller) {
        downloadStream.on('data', (chunk) => controller.enqueue(chunk));
        downloadStream.on('end', () => controller.close());
        downloadStream.on('error', (err) => controller.error(err));
      }
    });

    console.log("returning", readableStream);
    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'image/jpeg', // Adjust MIME type based on your images
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }
}

/* sarvy old function
export async function GET(req: Request, { params }: any) {
  await ConnectDB();
  const { id } = params;

  try {
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}
*/