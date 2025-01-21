import BlogModel from "@/lib/models/BlogModels";
import { ConnectDB } from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  await ConnectDB();
  const { id } = params;

  try {
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}
