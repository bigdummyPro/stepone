const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    recipients: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    currentSender: { type: mongoose.Types.ObjectId, ref: 'users' },
    isRead: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    convName: String,
    convType: {
        type: String,
        default: 'personal'
    },
    convAvatar: String,
    text: String,
    media: Array
},{
    timestamps: true
})

module.exports = mongoose.model('conversations', conversationSchema);