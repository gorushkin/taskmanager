import { combineReducers } from '@reduxjs/toolkit';
import user, { actions as userActions, asyncActions as userAsyncActions } from './user';
import tasks, {actions as tasksActions, asyncActions as tasksAsyncActions} from './tasks';
import projects, {
  actions as projectsActions,
  asyncActions as projectsAsyncActions,
} from './projects';
import error, { actions as errorActions } from './error';

export default combineReducers({ user, error, tasks, projects });

const actions = { ...userActions, ...errorActions, ...tasksActions, ...projectsActions };
const asyncActions = { ...userAsyncActions, ...tasksAsyncActions, ...projectsAsyncActions };

export { actions, asyncActions };
