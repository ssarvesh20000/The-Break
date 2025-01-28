import BlogModel from "@/lib/models/BlogModels";
import { ConnectDB } from "@/lib/mongo";
import { NextResponse } from 'next/server';

// GET function to get recent blog in every category used in home page
export async function GET() {
    await ConnectDB(); 
    try {
        // Categories to filter by
        const categories = ["San Diego", "United States", "World", "Opinion", "Multimedia"];

        // Aggregation pipeline
        const blogs = await BlogModel.aggregate([
            {
                $facet: categories.reduce((facetStages: { [key: string]: any[] }, category) => {
                    facetStages[category] = [
                        { $match: { category } }, // Match blogs in the current category
                        { $sort: { date: -1 } }, // Sort by date descending
                        { $limit: 10 } // Take the top 10 most recent blogs
                    ];
                    return facetStages;
                }, {})
            }
        ]);
        const listBlogs = Object.values(blogs[0]);
        return NextResponse.json({ success: true, data: listBlogs });
    } catch (error) {
        console.error("Error retrieving blogs:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch blogs" }, { status: 500 });
    }
}