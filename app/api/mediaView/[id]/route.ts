import { ConnectDB } from "@/lib/mongo";
import { NextResponse, NextRequest } from "next/server";
import MediaModel from "@/lib/models/MediaModel";
import { ObjectId } from 'mongodb';

type idParam = Promise<{ id: string }>;

// GET endpoint to get media by id
export async function GET(_: NextRequest, props: { params: idParam }) {
    await ConnectDB();
    const { id } = await props.params;

    try {
        if (!id) {
            return NextResponse.json({ success: false, error: "Media ID is required" }, { status: 400 });
        }

        const objectId = new ObjectId(id);
        const media = await MediaModel.findById(objectId);
        return NextResponse.json({ success: true, data: media });
    }
    catch (error) {
        console.error("Error retrieving media:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch media" }, { status: 500 });
    }
}
