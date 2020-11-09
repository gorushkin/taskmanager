import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncActions } from '../../slices';

const Form = ({ props: { _id, text, isDone, changeEditStatus } }) => {
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

  const closeHandler = () => changeEditStatus();

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
            <button type='submit' className='btn mr-2 btn-lg btn-primary px-sm-5'>
              Rename
            </button>
            <button onClick={closeHandler} type='button' className='btn btn-lg btn-danger'>
              &times;
            </button>
          </div>
        </div>
      </form>
    </li>
  );
};

export default Form;
