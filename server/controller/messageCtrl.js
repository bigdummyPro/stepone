const Conversations = require('../models/conversationModel');
const Messages = require('../models/messageModel');


class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const messageCtrl = {
    createMessage: async (req, res) => {
        try {
            const { sender, recipients, text, media, convID} = req.body;

            if(!recipients || (!text.trim() && media.length === 0)) return;

            let newConversation;
            if(convID){
                newConversation = await Conversations.findOneAndUpdate({
                    _id: convID
                }, {
                    recipients: [sender, ...recipients],
                    text, media
                }, { new: true, upsert: true })
            }else{
                newConversation = await Conversations.findOneAndUpdate({
                    $or: [
                        {recipients: [sender, ...recipients]},
                        {recipients: [...recipients, sender]}
                    ]
                }, {
                    recipients: [sender, ...recipients],
                    text, media
                }, { new: true, upsert: true })
            }

            const newMessage = new Messages({
                conversation: newConversation._id,
                sender,
                recipients, text, media
            })

            await newMessage.save()

            res.json({success: true, message: 'Create Success!'})

        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    createConversation: async (req, res) => {
        try {
            const {recipients, convName, convAvatar} = req.body;
            const newConversation = new Conversations({
                recipients,
                convName,
                convAvatar,
                convType: 'group'
            })
            await newConversation.save();
            res.json({success: true, message: 'Create Success!'});
        } catch (error) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    updateConversation: async (req, res) => {
        try {
            const {recipients, convName, convAvatar} = req.body;

            await Conversations.findOneAndUpdate({_id: req.params.id}, {
                $push: {recipients: recipients}, convName, convAvatar
            })
            res.json({success: true, message: 'Update Success!'});
        } catch (error) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    getConversations: async (req, res) => {
        try {
            const features = new APIfeatures(Conversations.find({
                recipients: req.user.id
            }), req.query).paginating()

            const conversations = await features.query.sort('-updatedAt')
            .populate('recipients', 'avatar username fullname')

            res.json({
                success: true,
                conversations,
                result: conversations.length
            })

        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    getMessages: async (req, res) => {
        try {
            let features;
            if(req.query.convID){
                features = new APIfeatures(Messages.find({
                    conversation: req.query.convID
                }), req.query).paginating()
            }else{
                features = new APIfeatures(Messages.find({
                    $or: [
                        {sender: req.user.id, recipients: req.query.userID},
                        {sender: req.query.userID, recipients: req.user.id}
                    ]
                }), req.query).paginating()
            }

            const messages = await features.query.sort('-createdAt')

            res.json({
                success: true,
                messages,
                result: messages.length
            })

        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
}

module.exports = messageCtrl;