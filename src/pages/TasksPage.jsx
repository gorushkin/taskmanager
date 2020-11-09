import React from 'react';
import InputForm from '../components/InputForm';
import TaskList from '../components/taskList/TaskList';
import Alert from '../components/Alert';

const TasksPage = () => {
  return (
    <>
      <Alert></Alert>
      <InputForm />
      <TaskList />
    </>
  );
};

export default TasksPage;
