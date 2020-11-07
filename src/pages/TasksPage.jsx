import React from 'react';
import InputForm from '../components/InputForm';
import Tasks from '../components/Tasks';
import Alert from '../components/Alert';

const TasksPage = () => {
  return (
    <>
      <Alert></Alert>
      <InputForm />
      <Tasks />
    </>
  );
};

export default TasksPage;
