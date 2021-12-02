const express = require('express');

const router = express.Router();

const authCtrl = require('../controller/authCtrl');

const verifyToken = require('../middleware/auth');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.put('/logout', verifyToken, authCtrl.logout);
router.put('/refreshToken', verifyToken, authCtrl.putRefreshToken);

module.exports = router;