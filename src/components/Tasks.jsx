import React, { useEffect, useContext, useState } from 'react';
import { ContextApp } from '../tasks';
import cn from 'classnames';

const ListItem = ({ _id, text, isDone }, removeHandler, modifyTask) => {
  const Item = () => {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(text);

    const inputHandler = (e) => {
      setValue(e.target.value);
    };

    const renameHandler = (id) => {
      setEdit(true);
    };

    const markDoneHandler = (id) => {
      const note = { id, text, isDone: !isDone };
      modifyTask(note);
    }

    const submithandler = (e) => {
      e.preventDefault();
      const note = { _id, text: value, isDone };
      modifyTask(note);
      setValue('');
      setEdit(false);
    };

    const textClass = cn('list__text', {
      'list__text--isdone': isDone,
    });

    if (edit) {
      return (
        <li key={_id} className='list-group-item list__item mb-1'>
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
      <li key={_id} className='list-group-item list__item mb-1'>
        <div className={textClass}>{text}</div>
        <div className='list__btns'>
          <button
            href='#'
            onClick={() => renameHandler(_id)}
            className='list__btn'
            aria-hidden='true'
          >
            rename
          </button>
          <button
            href='#'
            onClick={() => removeHandler(_id)}
            className='list__btn'
            aria-hidden='true'
          >
            remove
          </button>
          <button
            onClick={() => markDoneHandler(_id)}
            href='#'
            className='list__btn'
            aria-hidden='true'
          >
            mark done
          </button>
        </div>
      </li>
    );
  };

  return <Item key={_id} />;
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
    <div className='col'>
      <ul className='list-group pt-5 '>
        {tasks.state.map((item) => ListItem(item, removeHandler, tasks.modifyTask))}
      </ul>
    </div>
  );
};

export default Tasks;
