import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.scss';
import 'bootstrap';
import { TasksProvider } from './tasks';
import { AlertProvider } from './__alert';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './slices';
import { Provider } from 'react-redux';

const store = configureStore({ reducer });

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);
