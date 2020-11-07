import React, { useContext } from 'react';
import { AlertContext } from '../alert';

const Alert = () => {
  const {
    state: { name, type },
    hideAlert
  } = useContext(AlertContext);

  const closeHandler = () => {
    hideAlert();
  }

  return name && (
    <div className={`alert alert-${type}`} role='alert'>
      {name}
      <button onClick={closeHandler} type='button' className='close' data-dismiss='alert' aria-label='Close'>
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  );
};

export default Alert;
