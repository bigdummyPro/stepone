const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    tag: Object,
    reply: mongoose.Types.ObjectId,
    likes: [{type: mongoose.Types.ObjectId, ref: 'users'}],
    user: {type: mongoose.Types.ObjectId, ref: 'users'},
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId
},{
    timestamps: true
})

module.exports = mongoose.model('comments', commentSchema);