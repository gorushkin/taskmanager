import React, { useContext, useState, useRef, useEffect } from 'react';
import { ContextApp } from '../tasks';
import cn from 'classnames';

const Form = ({ props: { _id, text, isDone, changeEditStatus, modifyTask } }) => {
  const [value, setValue] = useState(text);
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
    inputEl.current.select();
  }, []);

  const inputHandler = (e) => {
    setValue(e.target.value);
  };

  const submithandler = (e) => {
    e.preventDefault();
    const note = { id: _id, text: value, isDone };
    modifyTask(note);
    setValue('');
    changeEditStatus();
  };

  return (
    <li key={_id} className='list-group-item list__item mb-1'>
      <form className='w-100' onSubmit={submithandler}>
        <div className='form-row'>
          <div className='col'>
            <input
              ref={inputEl}
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
};

const Task = ({
  props: { _id, text, isDone, changeEditStatus, removeHandler, markDoneHandler },
}) => {
  const textClass = cn('list__text', {
    'list__text--isdone': isDone,
  });

  return (
    <li key={_id} className='list-group-item list__item mb-1'>
      <div className={textClass}>{text}</div>
      <div className='list__btns'>
        <button
          href='#'
          onClick={() => changeEditStatus(_id)}
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

const ListItem = ({ _id, text, isDone }, removeHandler, modifyTask) => {
  const Component = () => {
    const [edit, setEdit] = useState(false);

    const changeEditStatus = () => {
      setEdit(!edit);
    };

    const markDoneHandler = (id) => {
      const note = { id, text, isDone: !isDone };
      modifyTask(note);
    };

    if (edit) {
      return <Form props={{ _id, text, isDone, changeEditStatus, modifyTask }} />;
    }
    return <Task props={{ _id, text, isDone, changeEditStatus, removeHandler, markDoneHandler }} />;
  };
  return <Component key={_id} />;
};

const Tasks = () => {
  const tasks = useContext(ContextApp);

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
