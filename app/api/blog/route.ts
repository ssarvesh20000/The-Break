import BlogModel from "@/lib/models/BlogModels";
import { ConnectDB } from "@/lib/mongo";
//import { writeFile } from "fs/promises";
const { NextResponse } = require('next/server');

const LoadDB = async () =>{
    await ConnectDB();
}

LoadDB();

//retrieve info from database
export async function GET(request: Request) {
    const blogs = await BlogModel.find({});
    
    return NextResponse.json({message: "API Working"});
}

//add to database
export async function POST(request: Request) {
    const formData = await request.formData();
    const timeStamp = Date.now();

    const image = formData.get("image");
    if (!image) {
        return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }
    if (image instanceof File) {
        //const imageByteData = await image.arrayBuffer();
        //const imageBuffer = Buffer.from(imageByteData);
        //const path =  `./public/${timeStamp}_${image.name}`;
        //await writeFile(path, imageBuffer);
        const imageUrl = `/${timeStamp}_${image.name}`;

    
    const title = formData.get("title");
    if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const blogData = {
        title: formData.get("title") || "",
        description: formData.get("description") || "",
        author: formData.get("author") || "",
        image: imageUrl,
        content: formData.get("content") || "",
    }
    await BlogModel.create(blogData);
    console.log("Blog Saved");
    return NextResponse.json({model: blogData});
    } else {
        return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
    }
}