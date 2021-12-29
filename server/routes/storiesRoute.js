const express = require('express');

const router = express.Router();

const storiesCtrl = require('../controller/storiesCtrl');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, storiesCtrl.createStories);

router.get('/', verifyToken, storiesCtrl.getStories);

router.patch('/update-like', verifyToken, storiesCtrl.updateLikes);

router.patch('/update-viewer', verifyToken, storiesCtrl.updateViewer);

module.exports = router;