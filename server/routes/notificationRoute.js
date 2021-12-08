const express = require('express');

const router = express.Router();

const notificationCtrl = require('../controller/notificationCtrl');

const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, notificationCtrl.createNotification)

router.delete('/:id', verifyToken, notificationCtrl.removeNotification)

router.get('/', verifyToken, notificationCtrl.getNotifications)

router.patch('/isRead-update/:id', verifyToken, notificationCtrl.isReadUpdate)

router.delete('/delete-all', verifyToken, notificationCtrl.removeAllNotification)

module.exports = router;