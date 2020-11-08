/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { asyncActions, actions } from './slices';
import Navbar from './components/Navbar';

const App = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActions.userInit());
  }, []);

  useEffect(() => {
    if (user.email) {
      dispatch(asyncActions.fetchData());
    } else {
      dispatch(actions.resetTaskList())
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar />
      <div className='container py-3'>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/tasks' component={user.email ? TasksPage : AuthPage} />
          <Route path='/auth' component={AuthPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
