import BlogModel from "@/lib/models/BlogModels";
import { ConnectDB } from "@/lib/mongo";
import { NextResponse } from 'next/server';
import { getBucket } from "@/lib/mongo";
import { Readable } from "stream";

// TODO modify so it gets the 7 recent ones for home page, also add other endpoints for getting blogs of categories, 
// GET function to get all the blogs in db
export async function GET(request: Request) {
    await ConnectDB(); // TODO look into more if calling connect db everytime is best idea
    try {
        const blogs = await BlogModel.find({});
        return NextResponse.json({ success: true, data: blogs });
    } catch (error) {
        console.error("Error retrieving blogs:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch blogs" }, { status: 500 });
    }
}

//add to database
export async function POST(request: Request) {
    await ConnectDB();
    const formData = await request.formData();
    const timeStamp = Date.now();

    const image = formData.get("image"); // expect image to be a File object
    console.log(image);
    if (!image) {
        return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }
    if (image instanceof File) {
        // save image to bucket
        const buffer = Buffer.from(await image.arrayBuffer());
        const bucket = getBucket();
        const readable = Readable.from(buffer);

        const uploadStream = bucket.openUploadStream(`${timeStamp}_${image.name}`,{
            metadata: {
                contentType: image.type,
                fileName: image.name,
                timestamp: timeStamp,
            },
        });
        readable.pipe(uploadStream);

        // Wait for the upload to complete
        await new Promise((resolve, reject) => {
            uploadStream.on('finish', resolve);
            uploadStream.on('error', reject);
            readable.pipe(uploadStream);
        });

        // Get the fileId of the uploaded image
        const imageId = uploadStream.id;

        const title = formData.get("title");
        if (!title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }
        const blogData = {
            title: formData.get("title") || "",
            description: formData.get("description") || "",
            author: formData.get("author") || "",
            image: imageId, // blog model has image id to trace back to image that is in bucket
            content: formData.get("content") || "",
        }
        await BlogModel.create(blogData);
        console.log("Blog Saved");
        return NextResponse.json({model: blogData});
    } else {
        return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
    }
}