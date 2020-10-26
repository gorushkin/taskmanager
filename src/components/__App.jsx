import React from 'react';
import InputForm from './InputForm';
import Tasks from './Tasks';
import { TasksProvider } from '../tasks';

const App = () => (
  <TasksProvider>
    <InputForm />
    <Tasks />
  </TasksProvider>
);

export default App;
