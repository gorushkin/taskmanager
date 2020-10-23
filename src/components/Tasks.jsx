import React, { useEffect, useContext } from 'react';
import { ContextApp } from '../tasks';

const Tasks = () => {
  const tasks= useContext(ContextApp);

  useEffect(() => {
    tasks.fetchData();
  }, []);

  const clickHandler = (id) => {
    tasks.removeNote(id);
  }

  return (
    <ul className='list-group pt-5'>
      {tasks.state.map(({ id, text }) => (
        <li key={id} className='list-group-item mb-1'>
          {text}
          {/* <button type='button' className='' data-dismiss='modal' aria-label='Close'> */}
            <span aria-hidden='true'>
              rename
            </span>
          {/* </button> */}
          <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
            <span onClick={() => clickHandler(id)} aria-hidden='true'>
              &times;
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tasks;
