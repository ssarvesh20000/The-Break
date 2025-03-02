import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    author: { type: String, required: false },
    category: { type: String, required: false },
    content: { type: String, required: false},
    image: { type: String, required: false }, 
    date: { type: Date, default: Date.now },
});

const BlogModel = mongoose.models.blog || mongoose.model('blog', Schema);

export default BlogModel;