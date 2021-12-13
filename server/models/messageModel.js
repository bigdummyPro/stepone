const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    conversation: { type: mongoose.Types.ObjectId, ref: 'conversations' },
    sender: { type: mongoose.Types.ObjectId, ref: 'users' },
    recipients: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    text: String,
    media: Array
},{
    timestamps: true
})

module.exports = mongoose.model('messages', messageSchema);