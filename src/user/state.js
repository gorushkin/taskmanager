import { useReducer } from 'react';
import axios from 'axios';
import routes from '../routes';
import user from './reducer';
import { ContextUser } from './index';
import routers from '../routes';

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user, {});

  const userSignIn = async ({ email, password }) => {
    const url = routes.login();
    try {
      const res = await axios.post(url, { email, password });
      const { user, token } = res.data;
      console.log('token: ', token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'USER__SIGNIN', payload: { user } });
    } catch (error) {
      console.log(error);
    }
  };

  const userSignUp = async ({ email, password }) => {
    const url = routers.register();
    console.log('url: ', url);
  };

  const userInit = () => {
    const initUserState = JSON.parse(localStorage.getItem('user1')) || {
      name: 'NoName',
      email: '',
      id: '',
      isGuest: true,
    };
    dispatch({ type: 'USER__INIT', payload: { user: initUserState } });
  };

  return (
    <ContextUser.Provider
      value={{
        state,
        dispatch,
        userSignIn,
        userSignUp,
        userInit,
      }}
    >
      {children}
    </ContextUser.Provider>
  );
};

export default UserProvider;
