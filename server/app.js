import express from 'express';
import _ from 'lodash';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import auth from './routes/auth.js';
import tasks from './routes/tasks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../', 'build')));
app.use('/api', auth);
app.use('/api', tasks);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
});

export default app;
