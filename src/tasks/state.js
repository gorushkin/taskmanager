/* eslint-disable no-unused-vars */
import { useReducer } from 'react';
import axios from 'axios';
import routes from '../routes';
import tasks from './reducer';
import { ContextApp } from './index';

const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasks, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const url = routes.tasks();
    try {
      const {
        data: { tasks },
      } = await axios.get(url, { headers: { Authorization: token } });
      dispatch({ type: 'FETCH_TASKS', payload: tasks });
    } catch (error) {
      console.log(error.message);
    }
  };

  const addNote = async (text, userId) => {
    const token = localStorage.getItem('token');
    const url = routes.task();
    try {
      const res = await axios.post(url, { text, userId }, { headers: { Authorization: token } });
      const {
        data: { note },
      } = res;
      dispatch({ type: 'ADD_TASK', payload: note });
    } catch (error) {
      console.log(error);
    }
  };

  const removeNote = async (id) => {
    const token = localStorage.getItem('token');
    const url = routes.task(id);
    try {
      const {
        data: { _id },
      } = await axios.delete(url, { headers: { Authorization: token } });
      dispatch({ type: 'REMOVE_TASK', payload: _id });
    } catch (error) {
      console.log(error);
    }
  };

  const modifyTask = async ({ id, text, isDone }) => {
    const token = localStorage.getItem('token');
    const url = routes.task(id);
    try {
      const {
        data: { _id, message },
      } = await axios.patch(url, { text, isDone }, { headers: { Authorization: token } });
      dispatch({ type: 'MODIFY_TASK', payload: { _id, text, isDone } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContextApp.Provider value={{ state, dispatch, fetchData, addNote, removeNote, modifyTask }}>
      {children}
    </ContextApp.Provider>
  );
};

export default TasksProvider;
