import express from 'express';
import { getTasks, addTask, removeTask, modifyTask } from '../controllers/tasks.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', addTask);
router.delete('/:id', removeTask);
router.patch('/:id', modifyTask);

export default router;
