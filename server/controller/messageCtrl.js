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
            const { sender, recipients, text, media, _convID} = req.body;

            if(!recipients || (!text.trim() && media.length === 0)) return;

            let newConversation;
            const conv = await Conversations.findById(_convID);
            if(conv){console.log([sender, ...recipients])
                newConversation = await Conversations.findOneAndUpdate({
                    _id: conv._id
                }, {
                    currentSender: sender,
                    text, media
                }, { new: true, upsert: true })
            }else{
                newConversation = await Conversations.findOneAndUpdate({
                    $or: [
                        {recipients: [...recipients, sender]},
                        {recipients: [sender, ...recipients]}
                    ]
                }, {
                    recipients: [sender, ...recipients],
                    currentSender: sender,
                    text, media
                }, { new: true, upsert: true })
            }

            const newMessage = new Messages({
                conversation: newConversation._id,
                sender,
                recipients, 
                text, 
                media
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
                convType: 'group',
                currentSender: null,
                text: ''
            })
            await newConversation.save();
            newConversation.populate('recipients currentSender', 'avatar username nickname');
            res.json({success: true, newConversation, message: 'Create Success!'});
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
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
            .populate('recipients currentSender', 'avatar username nickname')

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
            const conv = await Conversations.findById(req.params.id);
            if(conv){
                features = new APIfeatures(Messages.find({
                    conversation: conv._id
                }), req.query).paginating()
            }else{
                const convByPersonal = await Conversations.findOne({
                    $or: [
                        {recipients: [req.params.id, req.user.id]},
                        {recipients: [req.user.id, req.params.id]}
                    ]
                })
                if(!convByPersonal._id) return;

                features = new APIfeatures(Messages.find({
                    $or: [
                        {sender: req.user.id, recipients: req.params.id, conversation: convByPersonal._id.toString()},
                        {sender: req.params.id, recipients: req.user.id, conversation: convByPersonal._id.toString()}
                    ]
                }), req.query).paginating()
            }

            const messages = await features.query.sort('-createdAt').populate('recipients sender', 'avatar username nickname')

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