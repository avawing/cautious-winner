const mongoose = require('mongoose')

// REQUIRED: Type & Required
// STRETCH: Default

const blogSchema = new mongoose.Schema({
    created_by: {type: String, required: true},
    created_at: {type: Date, required: true, default: Date.now()},
    blog_title: {type: String, required: true},
    blog_content: {type: String, required: true},
    private:{type: Boolean, required: true, default: false}
})

const blogModel = mongoose.model('blogs', blogSchema)

module.exports = blogModel