import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions as errorActions } from './error';
import routes from '../routes';

const userInit = createAsyncThunk('user/init', async () => {
  const url = routes.user();
  const token = localStorage.getItem('token') || '';
  try {
    const response = await axios(url, { headers: { Authorization: token } });
    const {
      data: { user },
    } = response;
    return user;
  } catch (error) {
    console.log(error.response.data.message);
  }
});

const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    const url = routes.login();
    try {
      const response = await axios.post(url, { email, password });
      const {
        data: { user, token },
      } = response;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      dispatch(errorActions.showAlert({ error: error.response.data.message, type: 'danger' }));
      return rejectWithValue();
    }
  }
);

const userLogout = createAsyncThunk('user/logout', async (rejectWithValue, dispatch) => {
  const url = routes.logout();
  localStorage.setItem('token', null);
  localStorage.setItem('user', null);
  try {
    const response = await axios.post(url);
    const {
      data: { user },
    } = response;
    return user;
  } catch (error) {
    dispatch(errorActions.showAlert({ error: error.response.data.message, type: 'danger' }));
    return rejectWithValue();
  }
});

const userSignUp = createAsyncThunk(
  'user/signup',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    const url = routes.register();
    try {
      const response = await axios.post(url, { email, password });
      const {
        data: { user, token },
      } = response;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return response.data;
    } catch (error) {
      dispatch(errorActions.showAlert({ error: error.response.data.message, type: 'danger' }));
      return rejectWithValue();
    }
  }
);

const slice = createSlice({
  name: 'user',
  initialState: {
    user: { email: null, userId: null },
  },
  reducers: {},
  extraReducers: {
    [userInit.fulfilled]: (state, { payload }) => {
      state.user = payload;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.user = payload;
    },
    [userLogin.rejected]: (state) => {
      state.user = { email: null, userId: null };
    },
    [userLogout.fulfilled]: (state, { payload }) => {
      state.user = payload;
    },
    [userSignUp.fulfilled]: (state, { payload: { user } }) => {
      state.user = user;
    },
    [userSignUp.rejected]: (state) => {
      state.user = { email: null, userId: null };
    },
  },
});

const actions = { ...slice.actions };
const asyncActions = { userInit, userLogin, userLogout, userSignUp };

export { actions, asyncActions };
export default slice.reducer;
