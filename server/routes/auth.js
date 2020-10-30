import express from 'express';
import controller from '../controllers/auth.js';

const router = express.Router();

router.post('/users', controller);

export default router;
