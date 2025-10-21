import express from 'express';
const router = express.Router();

import register from '../controllers/controller.register.js';
import login from '../controllers/controller.login.js';
import verifyUser from '../controllers/controller.verify.js';
import reSendMail from "../controllers/controller.resendMail.js";
router.post('/register', register);   // Create a new user
router.post('/login', login);         // Login existing user
router.get('/verify', verifyUser);  // Verify user email via token
router.post('/resend-verification-mail',reSendMail)
// Future routes:
// router.post('/logout')
// router.post('/refresh')
// router.post('/forgot-password')
// router.get('/reset-password')

export default router;
