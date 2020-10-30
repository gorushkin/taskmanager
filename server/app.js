import express from 'express';
import _ from 'lodash';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
// import controller from './controllers/auth.js';
import state from './state/index.js';
import auth from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getNextId = () => Number(_.uniqueId());

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../', 'build')));
app.use('/api', auth);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
});

app.get('/api/tasks', (req, res) => {
  res.json(state.taskList);
});

app.post('/api/task', (req, res) => {
  const { text } = req.body;
  const note = { id: getNextId(), text, isDone: false };
  state.taskList = [note, ...state.taskList];
  res.status(201).json(note).end();
});

app.delete('/api/task/:id', (req, res) => {
  const id = Number(req.params.id);
  state.taskList = state.taskList.filter((item) => item.id !== id);
  res.status(201).json({ id }).end();
});

app.patch('/api/task/:id', (req, res) => {
  const { text, isDone } = req.body;
  console.log('isDone: ', isDone);
  const id = Number(req.params.id);
  state.taskList = state.taskList.map((item) => {
    if (item.id !== id) return item;
    return { ...item, text, isDone };
  });
  res.status(201).json({ id }).end();
});

// app.post('/api/users', controller);

export default app;
