const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likeIdSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'users'},
    emotionType: {type: String}
})
const storiesSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'users'},
    content: String,
    background: String,
    fontStyle: String,
    likeIds: [likeIdSchema],
    viewerIds: {
        type: Array,
        default: [],
    }
},{
    timestamps: true
})

module.exports = mongoose.model('stories', storiesSchema);