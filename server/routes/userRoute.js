const express = require('express');

const router = express.Router();

const userCtrl = require('../controller/userCtrl');

const verifyToken = require('../middleware/auth');

router.get('/', verifyToken, userCtrl.getUser);

module.exports = router;