const { findOneAndDelete } = require('../models/conversationModel');
const Conversations = require('../models/conversationModel');
const Messages = require('../models/messageModel');


class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 10
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
            if(conv){
                newConversation = await Conversations.findOneAndUpdate({
                    _id: conv._id
                }, {
                    currentSender: sender,
                    isRead: [sender],
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
                    isRead: [sender],
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
    deleteMessage: async (req, res) => {
        try {
            await Messages.findOneAndDelete({_id: req.params.id});

            res.json({
                success: true,
                message: 'Create Successfully'
            })
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    createConversation: async (req, res) => {
        try {
            const {recipients, convName, convAvatar} = req.body;
            if(convName === '' || recipients.length <= 0) return;

            const newConversation = new Conversations({
                recipients,
                convName,
                convAvatar,
                convType: 'group',
                currentSender: null,
                text: ''
            })
            await newConversation.save();
            const resConversation = await newConversation.populate('recipients currentSender', 'avatar username nickname');
            
            res.json({success: true, newConversation: resConversation, message: 'Create Success!'});
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    updateConversation: async (req, res) => {
        try {
            const {recipients, convName, convAvatar} = req.body;
            if(convName === '' || recipients.length <= 0) return;

            const newConversation = await Conversations.findOneAndUpdate({_id: req.params.id}, {
                recipients, convName, convAvatar
            }, {new: true}).populate('recipients currentSender', 'avatar username nickname');

            res.json({success: true, newConversation, message: 'Update Success!'});
        } catch (error) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    deleteConversation: async (req, res) => {
        try {
            const conv = await Conversations.findById(req.params.id);
            let resConv;
            if(conv){
                resConv = await Conversations.findOneAndDelete({
                    _id: conv._id
                })
            }else{
                resConv = await Conversations.findOneAndDelete({
                    $or: [
                        {recipients: [req.params.id, req.user.id]},
                        {recipients: [req.user.id, req.params.id]}
                    ]
                })
            }
            await Messages.deleteMany({conversation: resConv._id});

            res.json({success: true, message: 'Delete Successfully!'})

        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    isReadUpdate: async (req, res) => {
        try {
            const conv = await Conversations.findById(req.params.id);
            if(conv){
                await Conversations.findOneAndUpdate({_id: req.params.id}, {
                    $push: {isRead: req.user.id}
                }, {new: true});
            }else{
                await Conversations.findOneAndUpdate({
                    $or: [
                        {recipients: [req.params.id, req.user.id]},
                        {recipients: [req.user.id, req.params.id]}
                    ]
                }, { $push: {isRead: req.user.id}}, {new: true})
            }

            res.json({success: true, message: 'Update Success!'});
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    getConversations: async (req, res) => {
        try {
            const features = new APIfeatures(Conversations.find({
                recipients: req.user.id
            }), req.query).paginating()

            const conversations = await features.query.sort('-updatedAt')
            .populate('recipients currentSender isRead', 'avatar username nickname')

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
            if(!req.params.id) return res.json({
                success: false,
                messages: null
            });

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
                if(!convByPersonal) return res.json({
                    success: false,
                    messages: null
                });

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