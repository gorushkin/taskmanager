import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const userInit = createAsyncThunk('user/init', async () => {
  const url = routes.user();
  const token = localStorage.getItem('token') || '';
  try {
    const response = await axios(url, { headers: { Authorization: token } });
    const {
      data: { user, message },
    } = response;
    console.log('message: ', message);
    return user;
  } catch (error) {
    console.log(error.response.data.message);
  }
});

const userLogin = createAsyncThunk('user/login', async ({ email, password }) => {
  const url = routes.login();
  console.log('userLogin');
  console.log(email, password);
  try {
    const response = await axios.post(url, { email, password });
    const {
      data: { user, token, message },
    } = response;
    console.log('message: ', message);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.log(error.response.data.message);
  }
});

const userLogout = createAsyncThunk('user/logout', async () => {
  const url = routes.logout();
  localStorage.setItem('token', null);
  localStorage.setItem('user', null);
  try {
    const response = await axios.post(url);
    const {
      data: { user, message },
    } = response;
    console.log('message: ', message);
    return user;
  } catch (error) {
    // showAlert(error.response.data.message, 'danger');
    console.log(error.response.data.message);
  }
});

const slice = createSlice({
  name: 'user',
  initialState: {
    user: { email: '', userId: '' },
  },
  reducers: {},
  extraReducers: {
    [userInit.fulfilled]: (state, { payload }) => {
      state.user = payload;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.user = payload;
    },
    [userLogout]: (state, { payload }) => {
      state.user = payload;
    },
  },
});

const actions = { ...slice.actions };
const asyncActions = { userInit, userLogin, userLogout };

export { actions, asyncActions };
export default slice.reducer;
