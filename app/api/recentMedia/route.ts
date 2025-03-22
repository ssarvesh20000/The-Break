import MediaModel from "@/lib/models/MediaModel";
import { ConnectDB } from "@/lib/mongo";
import { NextResponse } from 'next/server';

// GET function used to return video MEDIA in ascending order, used in home page and multimedia page
export async function GET() {
    await ConnectDB(); 
    try {
        const media = await MediaModel.find({})
            .sort({ date: -1 }) // Sort by `timestamp` field in descending order
        return NextResponse.json({ success: true, data: media });
    } catch (error) {
        console.error("Error retrieving blogs:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch blogs" }, { status: 500 });
    }
}