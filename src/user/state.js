import { useReducer } from 'react';
import axios from 'axios';
import routes from '../routes';
import user from './reducer';
import { ContextUser } from './index';

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user, 'Ivan');

  const userSignIn = async ({ email, password }) => {
    const url = routes.users();
    console.log(email, password);
    try {
      const res = await axios.post(url, {email, password});
      // console.log('res: ', res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContextUser.Provider value={{state, dispatch, userSignIn}}>{children}</ContextUser.Provider>
  );
};

export default UserProvider;