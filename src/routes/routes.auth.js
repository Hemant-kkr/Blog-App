import express from 'express';
const   router = express.Router();
import register from '../controllers/controller.register.js';
import login from '../controllers/controller.login.js';

router.post('/register',register)
router.post('/login',login)
// router.post('/logout')
// router.post('/refresh')
// router.post('/forgot-password')
// router.get('/reset-password')

export default router;

