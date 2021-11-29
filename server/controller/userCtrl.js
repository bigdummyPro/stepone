const Users = require('../models/userModel');

const userCtrl = {
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password');//req.user.id : params of jwt return
            if(!user) return res.json({success: false, message: "Account does not exist"})
            res.json({success: true, user})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal Server Error"});
        }
    }
}

module.exports = userCtrl