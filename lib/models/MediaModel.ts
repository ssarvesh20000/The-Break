import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: false },
    description: { type: String, required: false },
    youtubeLink: { type: String, required: true }, 
    date: { type: Date, default: Date.now },
});

const MediaModel = mongoose.models.media || mongoose.model('media', MediaSchema);

export default MediaModel;