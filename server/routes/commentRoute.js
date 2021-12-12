const express = require('express');

const router = express.Router();

const commentCtrl = require('../controller/commentCtrl');

const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, commentCtrl.createComment);

router.patch('/:id', verifyToken, commentCtrl.updateComment);

router.patch('/:id/like', verifyToken, commentCtrl.likeComment);

router.patch('/:id/unlike', verifyToken, commentCtrl.unLikeComment);

module.exports = router;