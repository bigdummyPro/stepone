const express = require('express');

const router = express.Router();

const userCtrl = require('../controller/userCtrl');

const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, userCtrl.getUser);

router.get('/suggested-user', verifyToken, userCtrl.suggestedUser);

router.get('/get-user-by-id/:id', verifyToken, userCtrl.getUserById);

router.patch('/:id/follow', verifyToken, userCtrl.follow);

router.patch('/:id/unfollow', verifyToken, userCtrl.unfollow);

router.patch('/', verifyToken, userCtrl.updateUser);

module.exports = router;