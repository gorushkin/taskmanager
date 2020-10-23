import React, { useContext, useState } from 'react';
import { ContextApp } from '../tasks';

const InputForm = () => {
  const [value, setValue] = useState('');
  const tasks = useContext(ContextApp);


  const inputHandler = (e) => {
    setValue(e.target.value)
  }

  const submithandler = (e) => {
    e.preventDefault();
    tasks.addNote(value)
    setValue('');
  }

  return (
    <form onSubmit={submithandler} >
      <div className='form-row'>
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
      </div>
    </form>
  );
}

export default InputForm;
