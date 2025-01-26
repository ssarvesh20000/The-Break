// all endpoints for admin CRUD operations (creating, viewing all, updating, and deleting blogs)
import BlogModel from "@/lib/models/BlogModels";
import { ConnectDB } from "@/lib/mongo";
import { NextResponse } from 'next/server';
import { getBucket } from "@/lib/mongo";
import { Readable } from "stream";

// GET function to get all the blogs in db, used in admin page to get all blogs
export async function GET() {
    await ConnectDB(); // TODO look into more if calling connect db everytime is best idea
    try {
        const blogs = await BlogModel.find({});
        return NextResponse.json({ success: true, data: blogs });
    } catch (error) {
        console.error("Error retrieving blogs:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch blogs" }, { status: 500 });
    }
}

const uploadMedia = async (media: File) => {
    const timeStamp = Date.now();
    const buffer = Buffer.from(await media.arrayBuffer());
    const bucket = getBucket();
    const readable = Readable.from(buffer);

    const uploadStream = bucket.openUploadStream(`${timeStamp}_${media.name}`,{
        metadata: {
            contentType: media.type,
            fileName: media.name,
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
    return uploadStream.id;
}

//POST function to add to blog to database, used in write page to add blog from form
export async function POST(request: Request) {
    await ConnectDB();
    const formData = await request.formData();

    const image = formData.get("image"); // expect image to be a File object
    console.log(image);
    if (!image) {
        return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }
    // TODO add functionality if user uploads video
    if (image instanceof File) {
        // Get the fileId of the uploaded image
        const imageId = await uploadMedia(image);

        const title = formData.get("title");
        if (!title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }
        const blogData = {
            title: formData.get("title") || "",
            description: formData.get("description") || "",
            author: formData.get("author") || "",
            category: formData.get("category") || "",
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

// DELETE function to delete a blog from database, used in admin page to delete blog
export async function DELETE(request: Request) { 
    await ConnectDB();
    // TODO fix reading blogId from body
    const { id } = await request.json();

    try {
        await BlogModel.deleteOne({ _id: id });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ success: false, error: "Failed to delete blog" }, { status: 500 });
    }
}

// PUT function to update a blog in database, used in admin page to update blog
export async function PUT() { }