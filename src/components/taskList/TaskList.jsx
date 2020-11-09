import React, { useState} from 'react';
import { useSelector } from 'react-redux';
import Form from './TaskRenameFrom';
import Task from './Task';

const ListItem = ({ _id, text, isDone }) => {
  const Component = () => {
    const [edit, setEdit] = useState(false);

    const changeEditStatus = () => {
      setEdit(!edit);
    };

    if (edit) {
      return <Form props={{ _id, text, isDone, changeEditStatus }} />;
    }
    return <Task props={{ _id, text, isDone, changeEditStatus }} />;
  };
  return <Component key={_id} />;
};

const TaskList = () => {
  const { tasks } = useSelector((state) => state.tasks);

  return (
    <div className='col'>
      <ul className='list-group pt-5 '>{tasks.map((item) => ListItem(item))}</ul>
    </div>
  );
};

export default TaskList;
