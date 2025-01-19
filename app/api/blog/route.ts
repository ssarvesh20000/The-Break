import BlogModel from "@/lib/models/BlogModels";
import { ConnectDB } from "@/lib/mongo";

const { NextResponse } = require('next/server');

const LoadDB = async () =>{
    await ConnectDB();
}

LoadDB();

//retrieve info from database
export async function GET(request: Request) {
    return NextResponse.json({message: "API Working"});
}

//add to database
export async function POST(request: Request) {
    const formData = await request.formData();
    const timeStamp = Date.now();
    
    const title = formData.get("title");
    if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const blogData = {
        title: formData.get("title") || "",
        description: formData.get("description") || "",
        author: formData.get("author") || "",
        image: formData.get("image") || "",
        content: formData.get("content") || "",
    }
    await BlogModel.create(blogData);
    console.log("Blog Saved");
    return NextResponse.json({model: blogData});
}