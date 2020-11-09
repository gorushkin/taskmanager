import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncActions } from '../slices';
import cn from 'classnames';

const Form = ({ props: { _id, text, isDone, changeEditStatus, modifyTask } }) => {
  const [value, setValue] = useState(text);
  const inputEl = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    inputEl.current.focus();
    inputEl.current.select();
  }, []);

  const inputHandler = (e) => {
    setValue(e.target.value);
  };

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(asyncActions.modifyTask({ id: _id, text: value, isDone }));
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

const Task = ({ props: { _id, text, isDone, changeEditStatus } }) => {
  const textClass = cn('list__text', {
    'list__text--isdone': isDone,
  });
  const dispatch = useDispatch();
  const removeHandler = (id) => dispatch(asyncActions.removeTask(id));
  const markDoneHandler = (id) => dispatch(asyncActions.modifyTask({ id, text, isDone: !isDone }));

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

const Tasks = () => {
  const { tasks } = useSelector((state) => state.tasks);

  return (
    <div className='col'>
      <ul className='list-group pt-5 '>{tasks.map((item) => ListItem(item))}</ul>
    </div>
  );
};

export default Tasks;
