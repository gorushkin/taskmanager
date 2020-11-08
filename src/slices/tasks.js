import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const fetchData = createAsyncThunk('tasks/fetchData', async () => {
  const token = localStorage.getItem('token');
  const url = routes.tasks();
  try {
    const {
      data: { tasks },
    } = await axios.get(url, { headers: { Authorization: token } });
    return tasks;
  } catch (error) {
    console.log(error.message);
  }
});

const addTask = createAsyncThunk('tasks/addTask', async ({ text, userId }) => {
  const token = localStorage.getItem('token');
  const url = routes.task();
  try {
    const res = await axios.post(url, { text, userId }, { headers: { Authorization: token } });
    const {
      data: { task },
    } = res;
    return task;
  } catch (error) {
    console.log(error);
  }
});

const removeTask = createAsyncThunk('tasks/removeTask', async (id) => {
  const token = localStorage.getItem('token');
  const url = routes.task(id);
  try {
    const {
      data: { _id },
    } = await axios.delete(url, { headers: { Authorization: token } });
    return _id;
  } catch (error) {
    console.log(error);
  }
});

const modifyTask = createAsyncThunk('tasks/modifyTask', async ({ id, text, isDone }) => {
  const token = localStorage.getItem('token');
  const url = routes.task(id);
  try {
    const {
      data: { _id },
    } = await axios.patch(url, { text, isDone }, { headers: { Authorization: token } });
    return { _id, text, isDone };
  } catch (error) {
    console.log(error);
  }
});

const slice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    filter: '',
    sort: '',
  },
  reducers: {
    resetTaskList(state) {
      state.tasks = [];
    },
  },
  extraReducers: {
    [fetchData.fulfilled]: (state, { payload }) => {
      state.tasks = payload;
    },
    [addTask.fulfilled]: (state, { payload }) => {
      state.tasks.push(payload);
    },
    [removeTask.fulfilled]: (state, { payload }) => {
      state.tasks = state.tasks.filter((item) => item._id !== payload);
    },
    [modifyTask.fulfilled]: (state, { payload: { _id, text, isDone } }) => {
      state.tasks = state.tasks.map((item) => {
        if (item._id !== _id) return item;
        return { ...item, text, isDone };
      });
    },
  },
});

const actions = { ...slice.actions };
const asyncActions = { fetchData, addTask, removeTask, modifyTask };

export { actions, asyncActions };
export default slice.reducer;
