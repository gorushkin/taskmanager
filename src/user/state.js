import { useReducer } from 'react';
import axios from 'axios';
import routes from '../routes';
import user from './reducer';
import { ContextUser } from './index';

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user, {});

  const userSignIn = async ({ email, password }) => {
    const url = routes.login();
    try {
      const res = await axios.post(url, { email, password });
      const { user } = res.data;
      user.isGuest = false;
      localStorage.setItem('toket', JSON.stringify(user));
      dispatch({ type: 'USER__SIGNIN', payload: { user } });
    } catch (error) {
      console.log(error);
    }
  };

  const userInit = () => {
    const initUserState = JSON.parse(localStorage.getItem('token')) || {
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
        userInit,
      }}
    >
      {children}
    </ContextUser.Provider>
  );
};

export default UserProvider;
