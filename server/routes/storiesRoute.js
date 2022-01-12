const express = require('express');

const router = express.Router();

const storiesCtrl = require('../controller/storiesCtrl');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, storiesCtrl.createStories);

router.get('/', verifyToken, storiesCtrl.getStories);

router.get('/get-stories-by-id', verifyToken, storiesCtrl.getStoriesById);

router.patch('/update-like/:id', verifyToken, storiesCtrl.updateLikes);

router.patch('/update-viewer/:id', verifyToken, storiesCtrl.updateViewer);

router.delete('/:id', verifyToken, storiesCtrl.deleteStories);

module.exports = router;