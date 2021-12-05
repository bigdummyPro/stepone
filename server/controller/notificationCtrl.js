const Notifications = require('../models/notificationModel');

const notificationCtrl = {
    createNotification: async (req, res) => {
        try {
            const { id, recipients, url, text, content, image } = req.body

            if(recipients.includes(req.user.id.toString())) return;

            const notifications = new Notifications({
                id, recipients, url, text, content, image, user: req.user.id
            })

            await notifications.save()
            return res.json({success: true, notifications})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    removeNotification: async (req, res) => {
        try {
            const notifications = await Notifications.findOneAndDelete({
                id: req.params.id, url: req.query.url
            })
            
            return res.json({success: true, notifications})
        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    getNotifications: async (req, res) => {
        try {
            const notifications = await Notifications.find({recipients: req.user._id}).sort('-createdAt').populate('users', 'avatar username');
            
            return res.json({success: true, notifications})
        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    isReadUpdate: async (req, res) => {
        try {
            const notifications = await Notifications.findOneAndUpdate({_id: req.params.id}, {
                isRead: true
            })

            return res.json({success: true, notifications})
        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    removeAllNotification: async (req, res) => {
        try {
            const notifications = await Notifications.deleteMany({recipients: req.user.id})
            
            return res.json({success: true, notifications})
        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    }
}

module.exports = notificationCtrl;