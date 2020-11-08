import { useReducer } from 'react';
import { AlertContext } from './index';
import alert from './reducer';

const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alert, { name: null, type: null });

  const hideAlert = () => {
    dispatch({ type: 'HIDE_ALERT' });
  };

  const showAlert = (name, type) => {
    dispatch({ type: 'SHOW_ALERT', payload: { name, type } });
  };

  return (
    <AlertContext.Provider value={{ state, hideAlert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
