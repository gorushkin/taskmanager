import React, { useContext, useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import { ContextUser } from '../user';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';

const AuthPage = () => {
  const user = useContext(ContextUser);
  const history = useHistory();

  useEffect(() => {
    if (user.state.email) {
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
