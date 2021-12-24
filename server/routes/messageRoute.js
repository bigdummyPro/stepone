const express = require('express');

const router = express.Router();

const messageCtrl = require('../controller/messageCtrl');

const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, messageCtrl.createMessage);

router.get('/get-mess-by-conversation/:id', verifyToken, messageCtrl.getMessages);

router.post('/conversation', verifyToken, messageCtrl.createConversation);

router.get('/conversations', verifyToken, messageCtrl.getConversations);

router.patch('/conversation/:id', verifyToken, messageCtrl.updateConversation);

router.patch('/conversation/isRead/:id', verifyToken, messageCtrl.isReadUpdate);

module.exports = router;