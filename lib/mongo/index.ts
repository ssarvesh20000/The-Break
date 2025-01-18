import mongoose from "mongoose"
require('dotenv').config()

export const ConnectDB = async () =>{
    await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log("MongoDB connected")
}

