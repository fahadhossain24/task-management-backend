const express = require('express');
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/verifyToken');

const authRouter = express.Router()

authRouter.post('/signup', authController.signup);
authRouter.get('/signup/verification/:token', authController.emailConfirmation);
authRouter.post('/login', authController.login)
authRouter.get('/user', verifyToken, authController.getUser)

module.exports = authRouter