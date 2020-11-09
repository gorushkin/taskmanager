import React from 'react';
import InputForm from '../components/InputForm';
import TaskList from '../components/taskList/TaskList';
import Alert from '../components/Alert';
import Projects from '../components/Projects';

const TasksPage = () => {
  return (
    <div className='row'>
      <div className='col-3'>
        <Projects/>
      </div>
      <div className='col-9'>
        <Alert></Alert>
        <InputForm />
        <TaskList />
      </div>
    </div>
  );
};

export default TasksPage;
