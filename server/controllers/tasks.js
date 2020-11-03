import Task from '../models/Tasks.js';

const state = {
  taskList: [],
};

const getTasks = async (req, res) => {
  console.log('fetching!!!');
  const {
    user: { userId },
  } = req;
  try {
    const tasks = await Task.find({ userId });
    res.status(200).json({ tasks }).end();
  } catch (error) {
    console.log(error);
  }
  res.end();
};

const addTask = async (req, res) => {
  const { text, userId } = req.body;
  const note = new Task({ text, isDone: false, userId });
  try {
    await note.save();
    res
      .status(201)
      .json({
        note,
        message: 'task created',
      })
      .end();
  } catch (error) {
    console.log(error);
  }
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
