const Users = require('../models/userModel');
const Stories = require('../models/storiesModel');


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
const storiesCtrl = {
    createStories: async (req, res) => {
        try {
            const {content, background, fontStyle, user} = req.body;
            if(content === '') return;
            const stories = new Stories({
                content, background, fontStyle, user
            })
            await stories.save();
            const resStories = await stories.populate("user viewerIds likeIds.user", "avatar username nickname")

            return res.json({success: true, stories: resStories, message: 'Create successfully'})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    getStoriesById: async (req, res) => {
        try {
            const stories = await Stories.find({
                user: req.user.id
            })
            .sort('createdAt')
            .populate("user viewerIds likeIds.user", "avatar username nickname")
            // .populate({
            //     path: 'likeIds.user',
            //     select: 'avatar username nickname'
            // })
            res.json({success: true, stories: stories.slice(0, 10)})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    getStories: async (req, res) => {
        try {
            const userInDB = await Users.findById(req.user.id, 'following');
            if(!userInDB) return res.status(400).json({success: false, message: 'You have to login first'});
            // const features =  new APIfeatures(Stories.find({
            //     user: [...userInDB.following, req.user.id]
            // }), req.query).paginating()

            const stories = await Stories.find({
                user: [...userInDB.following]
            })
            .sort('createdAt')
            .populate("user viewerIds likeIds.user", "avatar username nickname")

            let storiesStorage = []
            const users = stories.map(story => story.user);
            const uniqueUsers = new Set(users); //Hàm set có chức năng lọc các giá trị trùng nhau
            
            uniqueUsers.forEach(user => {
                const userStories = stories.map(story => {
                    if (user._id === story.user._id) return story;
                });
                if (storiesStorage.length < 5) {
                    storiesStorage.push(
                        userStories.slice(0, 10).filter((n) => n), //filter có tác dụng clone mảng mới
                    ); 
                }
            });
            res.json({
                success: true,
                result: storiesStorage.length,
                stories: storiesStorage
            })
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    updateLikes: async (req, res) => {
        try {
            const {emotionType} = req.body;
            const stories = await Stories.findOne({_id: req.params.id});

            if(!stories) return;
            let updated;
            if(stories.likeIds.some(like => like.user === req.user.id)){
                const newLikeIds = stories.likeIds.map(like => {
                    if(like.user === req.user.id) return {
                        user: req.user.id,
                        emotionType
                    }
                    else return like
                })
                updated = await stories.updateOne({
                    $set: {
                        likeIds: newLikeIds
                    }
                });
            }else{
                updated = await Stories.findOneAndUpdate({_id: req.params.id}, {
                    $push: {
                        likeIds: {
                            user: req.user.id,
                            emotionType,
                        },
                    }
                }, {new: true})
            }

            if(!updated) return res.status(400).json({message: 'This story does not exist.'})

            res.json({success: true, message: 'Updated story!'})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    },
    updateViewer: async (req, res) => {
        try {
            const stories = await Stories.find({_id: req.params.id, viewerIds: req.user.id});

            if(stories.length > 0) return;

            const updated = await Stories.findOneAndUpdate({_id: req.params.id}, {
                $push: {viewerIds: req.user.id}
            }, {new: true})

            if(!updated) return res.status(400).json({message: 'This story does not exist.'})

            res.json({success: true, message: 'Updated story!'})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
    }
}

module.exports = storiesCtrl;