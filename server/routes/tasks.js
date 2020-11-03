import express from 'express';
import { getTasks, addTask, removeTask, modifyTask } from '../controllers/tasks.js';

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/task', addTask);
router.delete('/task/:id', removeTask);
router.patch('/task/:id', modifyTask);

export default router;
