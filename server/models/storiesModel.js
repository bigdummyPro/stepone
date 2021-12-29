const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storiesSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'users'},
    content: String,
    background: String,
    likeIds: {
        type: Array,
        default: [],
    },
    viewerIds: {
        type: Array,
        default: [],
    }
},{
    timestamps: true
})

module.exports = mongoose.model('stories', storiesSchema);