import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.scss';
import { UserProvider } from './user';

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
