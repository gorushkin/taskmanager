import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.scss';
import 'bootstrap';
import { UserProvider } from './user';
import { TasksProvider } from './tasks';

ReactDOM.render(
  <UserProvider>
    <TasksProvider>
      <App />
    </TasksProvider>
  </UserProvider>,
  document.getElementById('root')
);
