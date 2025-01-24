import BlogModel from "@/lib/models/BlogModels";
import { ConnectDB } from "@/lib/mongo";
import { NextResponse } from 'next/server';

// GET function to get recent blog in every category used in home page
export async function GET(request: Request) {
    await ConnectDB(); 
    try {
        // Categories to filter by
        const categories = ["San Diego", "United States", "World", "Opinion", "Multimedia", "Other"];

        // Aggregation pipeline
        const blogs = await BlogModel.aggregate([
            { 
                $match: { category: { $in: categories } } // Match blogs in the specified categories
            },
            { 
                $sort: { category: 1, date: -1 } // Sort by category (for grouping) and then by timestamp descending
            },
            { 
                $group: {
                    _id: "$category", // Group by the category field
                    mostRecentBlog: { $first: "$$ROOT" } // Take the most recent blog for each category
                }
            },
            { 
                $replaceRoot: { newRoot: "$mostRecentBlog" } // Replace root with the blog object for cleaner output
            }
        ]);
        return NextResponse.json({ success: true, data: blogs });
    } catch (error) {
        console.error("Error retrieving blogs:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch blogs" }, { status: 500 });
    }
}