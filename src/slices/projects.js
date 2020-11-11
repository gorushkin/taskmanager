import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions as errorActions } from './error';
import routes from '../routes';
import routers from '../routes';

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

const addProject = createAsyncThunk(
  'projects/add',
  async ({ name, userId }, { rejectWithValue, dispatch }) => {
    const url = routers.project();
    const token = localStorage.getItem('token');
    console.log('text: ', name);
    try {
      const response = await axios.post(
        url,
        { name, userId },
        { headers: { Authorization: token } }
      );
      const {
        data: { project },
      } = response;
      return project;
    } catch (error) {
      const errorMsg = error.response.data.message || error.message || 'Oops!!!';
      dispatch(errorActions.showAlert({ error: errorMsg, type: 'danger' }));
      return rejectWithValue();
    }
  }
);

const slice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    test: '',
    currentProjectId: null,
  },
  reducers: {},
  extraReducers: {
    [fetchProjects.fulfilled]: (state, { payload }) => {
      const [{ _id }] = payload.filter((item) => item.name === 'Inbox');
      state.projects = payload;
      state.currentProjectId = _id;
    },
    [addProject.fulfilled]: (state, { payload }) => {
      state.projects.push(payload);
    },
  },
});

const actions = { ...slice.actions };
const asyncActions = { fetchProjects, addProject };

export { actions, asyncActions };
export default slice.reducer;
