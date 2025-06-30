import express from 'express';
import { registerUser, verifyUser } from '../controllers/user.controller.js';


const router = express.Router();


router.post('/', registerUser);
router.post('/verify', verifyUser)




export default router;