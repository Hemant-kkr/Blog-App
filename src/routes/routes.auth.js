import express from 'express';
const router = express.Router();

import register from '../controllers/controller.register.js';
import login from '../controllers/controller.login.js';
import logout from '../controllers/controller.logout.js';
import verifyUser from '../controllers/controller.verify.js';
import reSendMail from "../controllers/controller.resendMail.js";
import forgotPassword from '../controllers/controller.forgotPassword.js';
import isVerified from "../middlewares/isVerified.js"
import  resetPassword from '../controllers/controller.resetPassword.js';

router.post('/register', register);   // Create a new user
router.post('/login', login);         // Login existing user
router.get('/verify', verifyUser);  // Verify user email via token
router.post('/resend-verification-mail',reSendMail) //resend verification link
// Future routes:
router.post('/logout',logout) //logout the user 
// router.post('/refresh')
router.post('/forgot-password',forgotPassword) //forGot password
router.post('/reset-password',resetPassword); //Reset Password

export default router;
