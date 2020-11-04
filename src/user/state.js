import { useReducer, useContext } from 'react';
import axios from 'axios';
import routes from '../routes';
import user from './reducer';
import { ContextUser } from './index';
// import { ContextApp } from '../tasks';
import routers from '../routes';

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user, {});
  // const tasks = useContext(ContextApp);

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

  const userInit = async () => {
    const url = routers.user();
    const token = localStorage.getItem('token') || '';
    try {
      const {
        data: { user, message },
      } = await axios(url, { headers: { Authorization: token } });
      dispatch({ type: 'USER__INIT', payload: { user } });
    } catch (error) {
      console.log(error);
    }
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
