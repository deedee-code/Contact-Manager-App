const express = require('express');
const userRouter = express.Router();
const { userInfo, registerUser, userLogin } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

userRouter.get('/user-info', validateToken, userInfo);
userRouter.post('/register', registerUser);
userRouter.post('/login', userLogin);

module.exports = userRouter;