import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import auth from './routes/auth.js';
import tasks from './routes/tasks.js';
import projects from './routes/projects.js';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authMiddleWare from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();

mongoose
  .connect(process.env.DB_K, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected!'))
  .catch((error) => console.log('MongoDB', error.message));

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../', 'build')));
app.use('/api', auth);
app.use('/api/projects', authMiddleWare, projects);
app.use('/api/tasks', authMiddleWare, tasks);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
});

app.get('/test', (req, res) => {
  res.json({message: 'Server is OK!!!'}).end();
});

export default app;
