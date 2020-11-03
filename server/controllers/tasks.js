import _ from 'lodash';
const getNextId = () => Number(_.uniqueId());
const state = {
  taskList: ['asdfadf'],
};

const getTasks = (req, res) => {
  console.log('tasks');
  console.log(req.user);
  res.json(state.taskList);
};

const addTask = (req, res) => {
  const { text } = req.body;
  const note = { id: getNextId(), text, isDone: false };
  state.taskList = [note, ...state.taskList];
  res.status(201).json(note).end();
};

const removeTask = (req, res) => {
  const id = Number(req.params.id);
  state.taskList = state.taskList.filter((item) => item.id !== id);
  res.status(201).json({ id }).end();
};

const renameTask = (req, res) => {
  const { text, isDone } = req.body;
  console.log('isDone: ', isDone);
  const id = Number(req.params.id);
  state.taskList = state.taskList.map((item) => {
    if (item.id !== id) return item;
    return { ...item, text, isDone };
  });
  res.status(201).json({ id }).end();
};

export { getTasks, addTask, removeTask, renameTask };
