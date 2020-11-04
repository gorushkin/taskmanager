import express from 'express';
import { login, register, getUserData } from '../controllers/auth.js';

const router = express.Router();

router.get('/user', getUserData);
router.post('/login', login);
router.post('/register', register);

export default router;
