import React, { useState, useContext } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { ContextUser } from '../user';

const AuthForm = () => {
  const [form, setForm] = useState({ email: 'qwe', password: 'qwe' });

  const user = useContext(ContextUser);

  const signInHandler = (e) => {
    e.preventDefault();
    console.log(form);
    user.userSignIn(form);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form>
      <div className='form-group'>
        <label htmlFor='exampleInputEmail1'>Email address</label>
        <input
          type='email'
          className='form-control'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          onChange={onChangeHandler}
          value={form.email}
          name='email'
        />
        <small id='emailHelp' className='form-text text-muted'>
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className='form-group'>
        <label htmlFor='exampleInputPassword1'>Password</label>
        <input
          onChange={onChangeHandler}
          type='password'
          className='form-control'
          id='exampleInputPassword1'
          name='password'
          value={form.password}
        />
      </div>
      <button className='btn btn-primary' onClick={signInHandler}>
        Sign In
      </button>
      <button className='btn btn-primary' onClick={signInHandler}>
        Sign Up
      </button>
    </form>
  );
};

export default AuthForm;
