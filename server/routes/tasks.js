import express from 'express';
import { getTasks, addTask, removeTask, renameTask } from '../controllers/tasks.js';
import passport from 'passport';
import authMiddleWare from '../middleware/auth.js';
const router = express.Router();

router.get('/tasks', passport.authenticate('jwt', { session: false }), getTasks);
router.get('/temp', authMiddleWare, getTasks);
router.post('/task', addTask);
router.delete('/task/:id', removeTask);
router.patch('/task/:id', renameTask);

export default router;
