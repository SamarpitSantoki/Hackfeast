const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth/auth.controller')

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/loginindex', authController.loginindex)

module.exports = router;