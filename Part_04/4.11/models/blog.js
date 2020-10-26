const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type:String,
        minlength:3,
        runValidators: true,
        required:true,
    },
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)