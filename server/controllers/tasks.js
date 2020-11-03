import Task from '../models/Tasks.js';

const state = {
  taskList: [],
};

const getTasks = async (req, res) => {
  const {
    user: { userId },
  } = req;
  try {
    const tasks = await Task.find({ userId });
    res.status(200).json({ tasks }).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error }).end();
  }
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
    res.status(500).json({ message: error }).end();
  }
};

const removeTask = async (req, res) => {
  const id = req.params.id;
  try {
    const {_id} = await Task.findByIdAndDelete(id);
    res.status(200).json({_id}).end();
  } catch (error) {
    res.status(500).json({ message: error.message }).end();
  }
};

const renameTask = async (req, res) => {
  const { text, isDone } = req.body;
  const id = req.params.id;
  try {
    const {_id} = await Task.findByIdAndUpdate(id, { text, isDone });
    res.status(201).json({ _id, message: 'Task was updated!!!' }).end();
  } catch (error) {

  }
};

export { getTasks, addTask, removeTask, renameTask };
