const express = require('express');
const router = express.Router();
const {createStudentIdentity,verifyOtp,Login,forgotPossword,resetPassword,logout,resendOTP } = require('../Controller/StudentController')
const {getAllQuestion,getSingleTopic,getDifficulty,GetById,UpDateQuestion,ReplaceQuestion,DeleteQuestion,AddQuestion} = require('../Controller/QuestionController')
const {auth} = require('../Middleware/AuthWare');
const limiter = require('../Utils/rateLimit')
const {SetQuestions,ValidateQuestion} = require('../Middleware/Verification');
const {isAdmin} =  require('../Middleware/AdminWare');

router.post('/register',SetQuestions,ValidateQuestion,createStudentIdentity);
router.patch('/verifyotp',limiter,verifyOtp);
router.post('/resendotp',limiter,resendOTP);
router.post('/login',limiter,Login);
router.post('/logout',limiter,auth,logout);
router.patch('/resetPassword/:token',limiter,resetPassword);
router.post('/forgotpassword',limiter,forgotPossword)

router.get('/getAllQuestion',limiter,auth,getAllQuestion);
router.get('/singleTopic/:topic',limiter,auth,getSingleTopic);
router.get('/difficultQuestions',limiter,auth,getDifficulty);
router.get('/question/:id',limiter,auth,GetById);
router.put('/updateQuestion/:id',limiter,auth,isAdmin,ReplaceQuestion);
router.patch('/upDateQuestion/:id',limiter,auth,isAdmin,UpDateQuestion);
router.delete('/delete/:id',limiter,auth,isAdmin,DeleteQuestion);
router.post('/addQuestion',limiter,auth,isAdmin,AddQuestion)

module.exports = router