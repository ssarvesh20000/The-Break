import { ConnectDB } from "@/lib/mongo";
import { NextResponse, NextRequest } from "next/server";
import BlogModel from "@/lib/models/BlogModels";

type categoryParam = Promise<{ category: string }>;

// GET endpoint to get blog by id
export async function GET(_: NextRequest, props: { params: categoryParam }) {
    await ConnectDB();
    const category = decodeURIComponent((await props.params).category);

    try {
        if (!category) {
            return NextResponse.json({ success: false, error: "Category is required" }, { status: 400 });
        }
        console.log("Category:", category);
        const blog = await BlogModel.find({ category: category });
        return NextResponse.json({ success: true, data: blog });
    }
    catch (error) {
        console.error("Error retrieving blog:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch blog" }, { status: 500 });
    }
}
