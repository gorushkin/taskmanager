import React, { useContext, useState } from 'react';
import { ContextApp } from '../tasks';
import {ContextUser} from '../user'

const InputForm = () => {
  const [value, setValue] = useState('');
  const tasks = useContext(ContextApp);
  const user = useContext(ContextUser);

  const inputHandler = (e) => {
    setValue(e.target.value);
  };

  const submithandler = (e) => {
    e.preventDefault();
    tasks.addNote(value, user.state.userId);
    setValue('');
  };

  return (
    <form onSubmit={submithandler} className='d-flex flex-row'>
      <div className='col'>
        <input
          type='task'
          value={value}
          className='form-control form-control-lg w-100'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          onChange={inputHandler}
        />
      </div>
      <div className='col-auto'>
        <button type='submit' className='btn btn-lg btn-primary px-sm-5'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default InputForm;
