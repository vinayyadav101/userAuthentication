const express = require('express');
const authRouter = express.Router();
const jwtAuth = require('../middleware/jwtAuth.js');

const{
    signUp,
    signIn,
    getUser,
    logout,
    sendOTP,
    checkOTP,
    forgetPassword
} = require('../controller/authController.js');

authRouter.post('/signup' , signUp)
authRouter.post('/signin' , signIn)
authRouter.get('/user' , jwtAuth , getUser)
authRouter.post('/logout' , logout)
authRouter.post('/sendotp' , sendOTP)
authRouter.post('/checkotp' , checkOTP)
authRouter.post('/forgetPassword' , forgetPassword)

module.exports = authRouter;