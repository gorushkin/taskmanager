import { useReducer } from 'react';
import axios from 'axios';
import routes from '../routes';
import tasks from './reducer';
import { ContextApp } from './index';

const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasks, []);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    const url = routes.tasks();
    try {
      const {
        data: { tasks },
      } = await axios.get(url, { headers: { Authorization: token } });
      console.log('tasks: ', tasks);
      dispatch({ type: 'FETCH_TASKS', payload: tasks });
    } catch (error) {
      console.log(error.message);
    }
  };

  const addNote = async (text, userId) => {
    const url = routes.task();
    console.log(text, userId);
    try {
      const res = await axios.post(url, { text, userId }, { headers: { Authorization: token } });
      const {
        data: { note },
      } = res;
      console.log('note: ', note);
      dispatch({ type: 'ADD_TASK', payload: note });
    } catch (error) {
      throw new Error(error);
    }
  };

  const removeNote = async (id) => {
    const url = routes.task(id);
    try {
      const {
        data: { id },
      } = await axios.delete(url, { headers: { Authorization: token } });
      dispatch({ type: 'REMOVE_TASK', payload: id });
    } catch (error) {}
  };

  const modifyTask = async ({ id, text, isDone }) => {
    const url = routes.task(id);
    try {
      await axios.patch(url, { text, isDone }, { headers: { Authorization: token } });
      dispatch({ type: 'MODIFY_TASK', payload: { id, text, isDone } });
    } catch (error) {}
  };

  return (
    <ContextApp.Provider value={{ state, dispatch, fetchData, addNote, removeNote, modifyTask }}>
      {children}
    </ContextApp.Provider>
  );
};

export default TasksProvider;
