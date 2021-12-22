const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    nickname: {
        type: String,
        trim: true,
        maxlength: 25
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: ''
    },
    role: {type: String, default: 'user'},
    gender: {type: String, default: 'Unset'},
    mobile: {type: String, default: ''},
    address: {type: String, default: ''},
    friends: [{type: mongoose.Types.ObjectId, ref: 'users'}],
    followers: [{type: mongoose.Types.ObjectId, ref: 'users'}],
    following: [{type: mongoose.Types.ObjectId, ref: 'users'}],
    savedPosts: [{type: mongoose.Types.ObjectId, ref: 'posts'}],
    refreshToken: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('users', UserSchema)