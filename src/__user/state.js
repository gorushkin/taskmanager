/* eslint-disable no-unused-vars */
import { useContext, useReducer } from 'react';
import axios from 'axios';
import routes from '../routes';
import user from './reducer';
import { ContextUser } from './index';
import { AlertContext } from '../__alert';

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user, {});
  const { showAlert } = useContext(AlertContext);

  const userSignIn = async ({ email, password }) => {
    const url = routes.login();
    try {
      const response = await axios.post(url, { email, password });
      const {
        data: { user, token, message },
      } = response;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'USER__SIGNIN', payload: { user } });
    } catch (error) {
      showAlert(error.response.data.message, 'danger');
    }
  };

  const userSignUp = async ({ email, password }) => {
    const url = routes.register();
    try {
      const response = await axios.post(url, { email, password });
      const {
        data: { user, token, message },
      } = response;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'USER__SIGNIN', payload: { user } });
      showAlert(message, 'success');
    } catch (error) {
      showAlert(error.response.data.message, 'danger');
    }
  };

  const userInit = async () => {
    const url = routes.user();
    const token = localStorage.getItem('token') || '';
    try {
      const response = await axios(url, { headers: { Authorization: token } });
      const {
        data: { user, message },
      } = response;
      dispatch({ type: 'USER__INIT', payload: { user } });
    } catch (error) {
      showAlert(error.response.data.message, 'danger');
    }
  };

  const userLogout = async () => {
    const url = routes.logout();
    localStorage.setItem('token', null);
    localStorage.setItem('user', null);
    try {
      const response = await axios.post(url);
      const {
        data: { user, message },
      } = response;
      dispatch({ type: 'USER__SIGNIN', payload: { user } });
    } catch (error) {
      showAlert(error.response.data.message, 'danger');
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
        userLogout,
      }}
    >
      {children}
    </ContextUser.Provider>
  );
};

export default UserProvider;