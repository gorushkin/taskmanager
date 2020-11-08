import { combineReducers } from '@reduxjs/toolkit';
import user, { actions as userActions, asyncActions as userAsyncActions } from './user';
import tasks, {actions as tasksActions, asyncActions as tasksAsyncActions} from './tasks';
import error, { actions as errorActions } from './error';

export default combineReducers({ user, error, tasks });

const actions = { ...userActions, ...errorActions, ...tasksActions };
const asyncActions = { ...userAsyncActions, ...tasksAsyncActions };

export { actions, asyncActions };
