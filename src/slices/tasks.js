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
  console.log(text, userId);
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

const slice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    filter: '',
    sort: '',
  },
  reducers: {},
  extraReducers: {
    [fetchData.fulfilled]: (state, { payload }) => {
      state.tasks = payload;
    },
    [addTask.fulfilled]: (state, { payload }) => {
      state.tasks.push(payload);
    },
  },
});

const actions = { ...slice.actions };
const asyncActions = { fetchData, addTask };

export { actions, asyncActions };
export default slice.reducer;
