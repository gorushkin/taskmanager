import { combineReducers } from '@reduxjs/toolkit';
import user, { actions, asyncActions } from './user';

export default combineReducers({ user });

export { actions, asyncActions };
