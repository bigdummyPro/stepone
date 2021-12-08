const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: String,
    images: {
        type: Array
    },
    videos: {
        type: Array
    },
    audios: {
        type: Array
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comments' }],
    user: {type: mongoose.Types.ObjectId, ref: 'users'}
},{
    timestamps: true
})

module.exports = mongoose.model('posts', postSchema);