import express from 'express';
import { registerUser, verifyUser , loginUser} from '../controllers/user.controller.js';


const router = express.Router();


router.post('/', registerUser);
router.post('/verify', verifyUser)
router.post('/login', loginUser)




export default router;