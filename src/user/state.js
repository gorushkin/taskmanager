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
      const {
        data: { user, token },
      } = await axios.post(url, { email, password });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'USER__SIGNIN', payload: { user } });
    } catch (error) {
      console.log(error);
    }
  };

  const userSignUp = async ({ email, password }) => {
    const url = routers.register();
    try {
      const { user, token } = await axios.post(url, { email, password });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  const userInit = () => {
    const initUserState = JSON.parse(localStorage.getItem('user')) || {
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
