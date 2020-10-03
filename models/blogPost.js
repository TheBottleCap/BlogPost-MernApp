const mongoose = require("mongoose")


// schema
const Schema = mongoose.Schema;
const blogPostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type:String,
        default: Date.now()
    }
});

// Model
const BlogPost = mongoose.model('BlogPost', blogPostSchema)

module.exports = BlogPost;
// above is exported globally
