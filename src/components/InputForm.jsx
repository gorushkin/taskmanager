import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncActions } from '../slices';

const InputForm = () => {
  const {
    user: { userId },
  } = useSelector((state) => state.user);
  const { currentProjectId } = useSelector((state) => state.projects);
  // console.log('currentProjectId: ', currentProjectId);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const inputHandler = (e) => {
    setText(e.target.value);
  };

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(asyncActions.addTask({ text, userId, currentProjectId }));
    setText('');
  };

  return (
    <form onSubmit={submithandler} className='d-flex flex-row'>
      <div className='col'>
        <input
          type='task'
          value={text}
          className='form-control form-control-lg w-100'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          onChange={inputHandler}
        />
      </div>
      <div className='col-auto'>
        <button type='submit' className='btn btn-lg btn-primary px-sm-5'>
          Add new task
        </button>
      </div>
    </form>
  );
};

export default InputForm;
