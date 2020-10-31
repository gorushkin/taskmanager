import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.scss';
import 'bootstrap';
import { UserProvider } from './user';

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
