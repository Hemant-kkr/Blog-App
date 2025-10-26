import express from 'express';
import getProfle from  '../controllers/controller.userProfile.js';
import getAlluser from '../controllers/controller.getAlluser.js';
const router = express.Router();


router.get('/me',getProfle); //user request own profile
// router.put('/me:id'); // user updates its request
router.get('/user-list',getAlluser);//admin req all users list with pagination 
// router.get('/:id') //admin req specific user profile
// router.put('/:id'); //admin updats user profile role
// router.delete('/:id'); //admin deletes user profile

export default router;