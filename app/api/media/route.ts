// all endpoints for MEDIA CRUD operations (creating, viewing all, updating, and deleting blogs)
import MediaModel from "@/lib/models/MediaModel";
import { ConnectDB } from "@/lib/mongo";
import { NextRequest, NextResponse } from 'next/server';
//import { getBucket } from "@/lib/mongo";
//import { Readable } from "stream";
import { ObjectId } from 'mongodb';

// GET function to get all the blogs in db, used in admin page to get all blogs
export async function GET() {
    await ConnectDB(); // TODO look into more if calling connect db everytime is best idea
    try {
        const media = await MediaModel.find({});
        return NextResponse.json({ success: true, data: media });
    } catch (error) {
        console.error("Error retrieving blogs:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch blogs" }, { status: 500 });
    }
}


/*

const uploadMedia = async (media: File) => {
    const timeStamp = Date.now();
    const buffer = Buffer.from(await media.arrayBuffer());
    const bucket = getBucket();
    const readable = Readable.from(buffer);

    const uploadStream = bucket.openUploadStream(`${timeStamp}_${media.name}`,{
        metadata: {
            contentType: media.type,
            fileName: media.name,
            timestamp: timeStamp,
        },
    });
    readable.pipe(uploadStream);

    // Wait for the upload to complete
    await new Promise((resolve, reject) => {
        uploadStream.on('finish', resolve);
        uploadStream.on('error', reject);
        readable.pipe(uploadStream);
    });

    // Get the fileId of the uploaded image
    return uploadStream.id;
}


const deleteMedia = async (imageId: string) => {
    const image = ObjectId.createFromHexString(imageId);
    const bucket = getBucket();
    await bucket.delete(image);
}
*/

//POST function to add to blog to database, used in write page to add blog from form
export async function POST(request: Request) {
    await ConnectDB();
    const formData = await request.formData();

    const youtubeLink = formData.get("media") as string;
    console.log("youtube link received in backend: " + youtubeLink);
    if (youtubeLink) {
        if (!isValidYouTubeLink(youtubeLink)) {
            return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
        }

        const mediaData = {
            title: formData.get("title") || "Untitled Video",
            author: formData.get("author") || "Unknown Author",
            description: formData.get("description") || "",
            youtubeLink: youtubeLink,
        }

        await MediaModel.create(mediaData);
        console.log("Media Saved");
        return NextResponse.json({model: mediaData});
    }

    return NextResponse.json({ error: "No youtube link provided" }, { status: 400 });

    /*
    if (image instanceof File) {
        // Get the fileId of the uploaded image
        const imageId = await uploadMedia(image);

        const title = formData.get("title");
        if (!title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }
        const mediaData = {
            title: formData.get("title") || "",
            description: formData.get("description") || "",
            author: formData.get("author") || "",
            category: formData.get("category") || "",
            image: imageId, // blog model has image id to trace back to image that is in bucket
            content: formData.get("content") || "",
        }
        await MediaModel.create(mediaData);
        console.log("Blog Saved");
        return NextResponse.json({model: mediaData});
    } else {
        return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
    }
    */
}

// DELETE function to delete a blog from database, used in admin page to delete blog
export async function DELETE(request: Request) { 
    await ConnectDB();
    const { id } = await request.json();
    const media = await MediaModel.findById(id);
    if (!media) {
        return NextResponse.json({ success: false, error: "Media not found" }, { status: 404 });
    }

//    await deleteMedia(media.image);

    try {
        await MediaModel.deleteOne({ _id: id });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting media:", error);
        return NextResponse.json({ success: false, error: "Failed to delete media" }, { status: 500 });
    }
}

// PUT function to update a blog in database, used in admin page to update blog
export async function PUT(request: NextRequest) {
    await ConnectDB();
    try {
        const formData = await request.formData();
        const id = formData.get("id");
        const media = await MediaModel.findById(id);
        if (!media) {
            return NextResponse.json({ success: false, error: "Media not found" }, { status: 404 });
        }
        
        // Extract other form fields
        const title = formData.get("title") as string;
        const author = formData.get("author") as string;
        const description = formData.get("description") as string;
        const youtubeLink = formData.get("youtubeLink") as string; 
        
        if (youtubeLink && !isValidYouTubeLink(youtubeLink)) {
            return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
        }

        const updateFields: any = { title, author, description};
        if (youtubeLink) updateFields.mediaLink = youtubeLink;


        // Update the blog in MongoDB
        await MediaModel.updateOne(
            { _id: id }, 
            { 
                $set: updateFields, 
                $currentDate: { date: true } // Automatically updates `updatedAt`
            }
        );
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating media:", error);
        return NextResponse.json({ success: false, error: "Failed to update media" }, { status: 500 });
    }
}

// Helper function to validate YouTube URLs
const isValidYouTubeLink = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    return regex.test(url);
};