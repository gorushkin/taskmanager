import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.scss';
import 'bootstrap';
import { UserProvider } from './user';
import { TasksProvider } from './tasks';
import { AlertProvider } from './alert';

ReactDOM.render(
  <AlertProvider>
    <UserProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </UserProvider>
  </AlertProvider>,
  document.getElementById('root')
);
