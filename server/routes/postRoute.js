const express = require('express');

const router = express.Router();

const postCtrl = require('../controller/postCtrl');
const verifyToken = require('../middleware/auth');


router.route('/')
    .post(verifyToken, postCtrl.createPost)
    .get(verifyToken, postCtrl.getPosts)
    
router.route('/:id')
    .get(verifyToken, postCtrl.getPost)
    .delete(verifyToken, postCtrl.deletePost)

router.patch('/:id/like', verifyToken, postCtrl.likePost);

router.patch('/:id/unlike', verifyToken, postCtrl.unLikePost);

router.get('/user-posts/:id', verifyToken, postCtrl.getUserPosts)


module.exports = router;