import React, { useReducer } from 'react';
import axios from 'axios';
import routes from '../routes';

export const ContextApp = React.createContext();

export const tasks = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      return [action.payload, ...state];
    }
    case 'FETCH_TASKS': {
      return [...action.payload.data];
    }
    case 'REMOVE_TASK': {
      return state.filter((item) => item.id !== action.payload);
    }
    default:
      return state;
  }
};

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasks, []);

  const fetchData = async () => {
    const url = routes.tasks();
    const data = await axios.get(url);
    dispatch({ type: 'FETCH_TASKS', payload: data });
  };

  const addNote = async (text) => {
    const url = routes.addtask();
    try {
      const res = await axios.post(url, { text });
      const { data } = res;
      dispatch({ type: 'ADD_TASK', payload: data });
    } catch (error) {
      throw new Error(error);
    }
  };

  const removeNote = async (id) => {
    const url = routes.removeTask(id);
    try {
      const {
        data: { id },
      } = await axios.delete(url);
      dispatch({ type: 'REMOVE_TASK', payload: id });
    } catch (error) {}
  };

  return (
    <ContextApp.Provider value={{ state, dispatch, fetchData, addNote, removeNote }}>
      {children}
    </ContextApp.Provider>
  );
};
