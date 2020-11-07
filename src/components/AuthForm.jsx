import React, { useState, useContext } from 'react';
import { ContextUser } from '../user';

const AuthForm = () => {
  const [form, setForm] = useState({ email: 'demo', password: 'demo' });

  const user = useContext(ContextUser);

  const signInHandler = (e) => {
    e.preventDefault();
    user.userSignIn(form);
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    user.userSignUp(form);
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
      <button className='btn btn-primary mr-3' onClick={signInHandler}>
        Sign In
      </button>
      <button className='btn btn-primary' onClick={signUpHandler}>
        Sign Up
      </button>
      <div className='flex-column justify-content-center align-items-center'>
        <h3 className='text-center'>Демо доступ</h3>
        <div>
          <p className='text-center'>
            Login: <b>demo</b>
          </p>
          <p className='text-center'>
            Password: <b>demo</b>
          </p>
        </div>
      </div>
    </form>
  );
};
export default AuthForm;
