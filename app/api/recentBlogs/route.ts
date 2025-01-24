import BlogModel from "@/lib/models/BlogModels";
import { ConnectDB } from "@/lib/mongo";
import { NextResponse } from 'next/server';

// GET function used to return 7 most recent blogs used in home page
export async function GET(request: Request) {
    await ConnectDB(); 
    try {
        const blogs = await BlogModel.find({})
            .sort({ date: -1 }) // Sort by `timestamp` field in descending order
            .limit(7); // Limit the results to 7
        return NextResponse.json({ success: true, data: blogs });
    } catch (error) {
        console.error("Error retrieving blogs:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch blogs" }, { status: 500 });
    }
}