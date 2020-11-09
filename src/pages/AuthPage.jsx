import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AuthForm from '../components/AuthForm';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';

const AuthPage = () => {
  const { user } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (user.email) {
      console.log('redrect!!!');
      history.push('/tasks');
    }
  });

  return (
    <>
      <Alert></Alert>
      <AuthForm></AuthForm>
  </>
  );
};

export default AuthPage;
