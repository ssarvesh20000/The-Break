import BlogModel from "@/lib/models/BlogModels";
import { ConnectDB } from "@/lib/mongo";
//import { writeFile } from "fs/promises";
const { NextResponse } = require('next/server');
import { getBucket } from "@/lib/mongo";
import { Readable } from "stream";

//import mongoose from 'mongoose';
//let bucket: GridFSBucket;

const LoadDB = async () =>{
    await ConnectDB();
}

LoadDB();
/*
//retrieve info from database:

export async function GET(request: Request) {
    const blogs = await BlogModel.find({});
    
    return NextResponse.json({message: "API Working"});
}

*/
export async function GET(request: Request) {
    console.log("Fetching blogs...");
    try {
        const blogs = await BlogModel.find({});
        console.log("Blogs retrieved successfully");
        console.log(blogs);
        return NextResponse.json({ success: true, data: blogs });
    } catch (error) {
        console.error("Error retrieving blogs:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch blogs" }, { status: 500 });
    }
}

//add to database
export async function POST(request: Request) {
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