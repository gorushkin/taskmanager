import React from 'react';
import InputForm from '../components/InputForm';
import Tasks from '../components/Tasks';
import { TasksProvider } from '../tasks';

const TasksPage = () => (
  <TasksProvider>
    <InputForm />
    <Tasks />
  </TasksProvider>
);

export default TasksPage;
