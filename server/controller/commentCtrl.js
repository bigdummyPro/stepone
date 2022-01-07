const Posts = require('../models/postModel');
const Comments = require('../models/commentModel');

const commentCtrl = {
    createComment: async (req, res) => {
        try {
            const { postId, content, tag, reply, postUserId } = req.body

            const post = await Posts.findById(postId)
            if(!post) return res.status(400).json({success: false, message: "This post does not exist."})

            if(reply){
                const cm = await Comments.findById(reply)
                if(!cm) return res.status(400).json({success: false, message: "This comment does not exist."})
            }

            const newComment = new Comments({
                user: req.user.id, content, tag, reply, postUserId, postId
            })

            await Posts.findOneAndUpdate({_id: postId}, {
                $push: {comments: newComment._id}
            }, {new: true})

            await newComment.save()

            res.json({success: true, newComment})

        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    updateComment: async (req, res) => {
        try {
            const { content } = req.body
            
            await Comments.findOneAndUpdate({
                _id: req.params.id, user: req.user.id
            }, {content})

            res.json({success: true, message: 'Update Successfully!'})

        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    likeComment: async (req, res) => {
        try {
            const comment = await Comments.find({_id: req.params.id, likes: req.user.id})
            if(comment.length > 0) return res.status(400).json({success: false, message: "You liked this post."})

            await Comments.findOneAndUpdate({_id: req.params.id}, {
                $push: {likes: req.user.id}
            }, {new: true})

            res.json({success: true, message: 'Liked Comment!'})

        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    unLikeComment: async (req, res) => {
        try {

            await Comments.findOneAndUpdate({_id: req.params.id}, {
                $pull: {likes: req.user.id}
            }, {new: true})

            res.json({success: true, message: 'UnLiked Comment!'})

        } catch (err) {
            return res.status(500).json({success: false, message: err.message})
        }
    },
    deleteComment: async (req, res) => {
        try {
            const comment = await Comments.findOneAndDelete({
                _id: req.params.id,
                $or: [
                    {user: req.user.id},
                    {postUserId: req.user.id}
                ]
            })

            await Posts.findOneAndUpdate({_id: comment.postId}, {
                $pull: {comments: req.params.id}
            })

            res.json({success: true, message: 'Deleted Comment!'})

        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    }
}


module.exports = commentCtrl