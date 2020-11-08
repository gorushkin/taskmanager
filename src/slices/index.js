import { combineReducers } from '@reduxjs/toolkit';
import user, { actions as userActions, asyncActions as userAsyncActions } from './user';
import error, { actions as errorActions } from './error';

export default combineReducers({ user, error });

const actions = { ...userActions, ...errorActions };
const asyncActions = { ...userAsyncActions };

export { actions, asyncActions };
