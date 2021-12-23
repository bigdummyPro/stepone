const express = require('express');

const router = express.Router();

const postCtrl = require('../controller/postCtrl');
const verifyToken = require('../middleware/auth');


router.route('/post')
    .post(verifyToken, postCtrl.createPost)
    .get(verifyToken, postCtrl.getPosts)
    
router.route('/post/:id')
    .get(verifyToken, postCtrl.getPost)
    .delete(verifyToken, postCtrl.deletePost)

router.patch('/post/:id/like', verifyToken, postCtrl.likePost);

router.patch('/post/:id/unlike', verifyToken, postCtrl.unLikePost);

router.get('/post/user-posts/:id', verifyToken, postCtrl.getUserPosts);

router.patch('/savePost/:id', verifyToken, postCtrl.savePost)

router.patch('/unSavePost/:id', verifyToken, postCtrl.unSavePost)

router.get('/getSavePosts', verifyToken, postCtrl.getSavePosts)


module.exports = router;