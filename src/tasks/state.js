import { useReducer } from 'react';
import axios from 'axios';
import routes from '../routes';
import tasks from './reducer';
import { ContextApp } from './index';

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasks, []);

  const fetchData = async () => {
    const url = routes.tasks();
    const data = await axios.get(url);
    dispatch({ type: 'FETCH_TASKS', payload: data });
  };

  const addNote = async (text) => {
    const url = routes.task();
    try {
      const res = await axios.post(url, { text });
      const { data } = res;
      dispatch({ type: 'ADD_TASK', payload: data });
    } catch (error) {
      throw new Error(error);
    }
  };

  const removeNote = async (id) => {
    const url = routes.task(id);
    try {
      const {
        data: { id },
      } = await axios.delete(url);
      dispatch({ type: 'REMOVE_TASK', payload: id });
    } catch (error) {}
  };

  const modifyTask = async ({ id, text, isDone }) => {
    const url = routes.task(id);
    try {
      await axios.patch(url, { text, isDone });
      dispatch({ type: 'MODIFY_TASK', payload: { id, text, isDone } });
    } catch (error) {}
  };

  return (
    <ContextApp.Provider value={{ state, dispatch, fetchData, addNote, removeNote, modifyTask }}>
      {children}
    </ContextApp.Provider>
  );
};
