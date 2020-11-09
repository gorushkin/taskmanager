import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions as errorActions } from './error';
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

const addTask = createAsyncThunk(
  'tasks/addTask',
  async ({ text, userId, currentProjectId }, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem('token');
    const url = routes.tasks();
    try {
      const response = await axios.post(
        url,
        { text, userId, currentProjectId },
        { headers: { Authorization: token } }
      );
      const {
        data: { task },
      } = response;
      return task;
    } catch (error) {
      const errorMsg = error.response.data.message || error.message || 'Oops!!!';
      dispatch(errorActions.showAlert({ error: errorMsg, type: 'danger' }));
      return rejectWithValue();
    }
  }
);

const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (id, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem('token');
    const url = routes.task(id);
    try {
      const response = await axios.delete(url, { headers: { Authorization: token } });
      const {
        data: { _id },
      } = response;
      return _id;
    } catch (error) {
      const errorMsg = error.response.data.message || error.message || 'Oops!!!';
      dispatch(errorActions.showAlert({ error: errorMsg, type: 'danger' }));
      return rejectWithValue();
    }
  }
);

const modifyTask = createAsyncThunk(
  'tasks/modifyTask',
  async ({ id, text, isDone }, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem('token');
    const url = routes.task(id);
    try {
      const response = await axios.patch(
        url,
        { text, isDone },
        { headers: { Authorization: token } }
      );
      const {
        data: { _id },
      } = response;
      return { _id, text, isDone };
    } catch (error) {
      const errorMsg = error.response.data.message || error.message || 'Oops!!!';
      dispatch(errorActions.showAlert({ error: errorMsg, type: 'danger' }));
      return rejectWithValue();
    }
  }
);

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
    [addTask.rejected]: (state, { payload }) => {
      return state;
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
