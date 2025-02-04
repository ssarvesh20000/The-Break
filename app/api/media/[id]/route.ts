import { ConnectDB } from "@/lib/mongo";
import { NextResponse, NextRequest } from "next/server";
import BlogModel from "@/lib/models/BlogModels";
import { ObjectId } from 'mongodb';

type idParam = Promise<{ id: string }>;

// TODO sarvy update this function to retrieve media instead of blogs, I have just copy and pasted the blog one here
// GET endpoint to get media by id
export async function GET(_: NextRequest, props: { params: idParam }) {
    await ConnectDB();
    const { id } = await props.params;

    try {
        if (!id) {
            return NextResponse.json({ success: false, error: "Media ID is required" }, { status: 400 });
        }

        const objectId = new ObjectId(id);
        const blog = await BlogModel.findById(objectId);
        return NextResponse.json({ success: true, data: blog });
    }
    catch (error) {
        console.error("Error retrieving blog:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch blog" }, { status: 500 });
    }
}
