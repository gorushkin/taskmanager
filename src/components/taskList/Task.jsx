import React from 'react';
import { useDispatch } from 'react-redux';
import { asyncActions } from '../../slices';
import cn from 'classnames';

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

export default Task;
