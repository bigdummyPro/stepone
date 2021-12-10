const Posts = require('../models/postModel');
const Comments = require('../models/commentModel');
const Users = require('../models/userModel');


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
const postCtrl = {
    createPost: async (req, res) => {
        try {
            const { content, images, videos, audios } = req.body

            if(content === '')
            return res.status(400).json({msg: "Please add your content."})

            const newPost = new Posts({
                content, images, videos, audios, user: req.user.id
            })
            await newPost.save()

            res.json({
                success: true,
                newPost: {
                    ...newPost._doc,
                    user: req.user
                }
            })
        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    getPosts: async (req, res) => {
        try {
            const userInDB = await Users.findById({_id: req.user.id}, 'following');
            if(!userInDB) return res.status(400).json({success: false, message: 'You have to login first'});

            const features =  new APIfeatures(Posts.find({
                user: [...userInDB.following, req.user.id]
            }), req.query).paginating()

            const posts = await features.query.sort('-createdAt')
            .populate("user likes", "avatar username nickname followers")
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

            res.json({
                success: true,
                result: posts.length,
                posts
            })

        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    likePost: async (req, res) => {
        try {
            const post = await Posts.find({_id: req.params.id, likes: req.user.id})
            if(post.length > 0) return res.status(400).json({success: false, message: "You liked this post."})

            const like = await Posts.findOneAndUpdate({_id: req.params.id}, {
                $push: {likes: req.user.id}
            }, {new: true})

            if(!like) return res.status(400).json({success: false, message: 'This post does not exist.'})

            res.json({success: true, message: 'Liked Post!'})

        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    unLikePost: async (req, res) => {
        try {

            const like = await Posts.findOneAndUpdate({_id: req.params.id}, {
                $pull: {likes: req.user.id}
            }, {new: true})

            if(!like) return res.status(400).json({success: false, message: 'This post does not exist.'})

            res.json({success: true, message: 'UnLiked Post!'})

        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    deletePost: async (req, res) => {
        try {
            const post = await Posts.findOneAndDelete({_id: req.params.id, user: req.user.id})
            // await Comments.deleteMany({_id: {$in: post.comments }})

            res.json({
                success: true,
                newPost: {
                    ...post,
                    user: req.user
                }
            })

        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    getUserPosts: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({user: req.params.id}), req.query).paginating()

            const posts = await features.query.sort("-createdAt").populate("user likes", "avatar username nickname followers")

            res.json({
                success: true,
                posts,
                result: posts.length
            })

        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id)
            .populate("user likes", "avatar username fullname followers")
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

            if(!post) return res.status(400).json({success: false, message: 'This post does not exist.'})

            res.json({
                success: true,
                post
            })

        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
}

module.exports = postCtrl;