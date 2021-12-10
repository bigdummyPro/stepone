const express = require('express');

const router = express.Router();

const commentCtrl = require('../controller/commentCtrl');

const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, commentCtrl.createComment);
router.patch('/:id', verifyToken, commentCtrl.updateComment);

module.exports = router;