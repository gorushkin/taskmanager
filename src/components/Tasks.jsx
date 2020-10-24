import React, { useEffect, useContext, useState } from 'react';
import { ContextApp } from '../tasks';

const ListItem = (id, text, removeHandler, renameNote) => {
  const Item = () => {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(text);

    const inputHandler = (e) => {
      setValue(e.target.value);
    };

    const renameHandler = (id) => {
      setEdit(true);
    };

    const submithandler = (e) => {
      e.preventDefault();
      renameNote(id, value);
      setValue('');
      setEdit(false);
    };

    if (edit) {
      return (
        <li key={id} className='list-group-item list__item mb-1'>
          <form onSubmit={submithandler}>
            <div className='form-row'>
              <div className='col'>
                <input
                  type='task'
                  className='form-control form-control-lg w-100'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  value={value}
                  onChange={inputHandler}
                />
              </div>
              <div className='col-auto'>
                <button type='submit' className='btn btn-lg btn-primary px-sm-5'>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </li>
      );
    }

    return (
      <li key={id} className='list-group-item list__item mb-1'>
        <div className='list__main-content'>
          {text}
          <button
            href='#'
            onClick={() => renameHandler(id)}
            className='list__rename-btn'
            aria-hidden='true'
          >
            rename
          </button>
          <button
            href='#'
            onClick={() => removeHandler(id)}
            className='list__rename-btn'
            aria-hidden='true'
          >
            remove
          </button>
        </div>
        <button type='button' className='list__close-btn close2' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </li>
    );
  };

  return <Item key={id} />;
};

const Tasks = () => {
  const tasks = useContext(ContextApp);

  useEffect(() => {
    tasks.fetchData();
  }, []);

  const removeHandler = (id) => {
    tasks.removeNote(id);
  };

  return (
    <ul className='list-group pt-5'>
      {tasks.state.map(({ id, text }) => ListItem(id, text, removeHandler, tasks.renameNote))}
    </ul>
  );
};

export default Tasks;
