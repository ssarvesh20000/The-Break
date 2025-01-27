// boiler plate to connect to mongo db
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
require('dotenv').config();

let bucket: GridFSBucket;

export const ConnectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB already connected");
        }
        else {
            await mongoose.connect(`${process.env.MONGODB_URI}`);
            console.log("MongoDB connected");
        }

        const db = mongoose.connection.db;
        if (!db) {
            throw new Error("Failed to get the database connection");
        }

        // create bucket for saving images
        bucket = new GridFSBucket(db, { bucketName: "images" });
        console.log("GridFS bucket initialized");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

// function for getting bucket when needing to reading and writing images
export const getBucket = () => {
    if (!bucket) {
        throw new Error("GridFS bucket is not initialized. Connect to MongoDB first.");
    }
    return bucket;
};