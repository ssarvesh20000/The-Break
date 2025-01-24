import { ConnectDB } from "@/lib/mongo";
import { NextResponse, NextRequest } from "next/server";
import { getBucket } from '@/lib/mongo'; 
import { ObjectId } from 'mongodb';

// GET function to get an image given its id in the blog model
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await ConnectDB();
  const { id } = await params;

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