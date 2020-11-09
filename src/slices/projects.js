import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions as errorActions } from './error';
import routes from '../routes';

const fetchProjects = createAsyncThunk('projects/fetchData', async () => {
  console.log('fetchProjects');
  const token = localStorage.getItem('token');
  const url = routes.projects();
  try {
    const {
      data: { projects },
    } = await axios.get(url, { headers: { Authorization: token } });
    return projects;
  } catch (error) {
    console.log(error.message);
  }
});

const slice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    currentProjectId: null,
  },
  reducers: {
    resetTaskList(state) {
      state.tasks = [];
    },
  },
  extraReducers: {
    [fetchProjects.fulfilled]: (state, { payload }) => {
      const [{ _id }] = payload.filter((item) => item.name === 'Inbox');
      state.projects = payload;
      state.currentProjectId = _id;
    },
  },
});

const actions = { ...slice.actions };
const asyncActions = { fetchProjects };

export { actions, asyncActions };
export default slice.reducer;
