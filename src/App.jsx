/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { ContextUser } from './user';
import { ContextApp } from './tasks';
import Navbar from './components/Navbar';

const App = () => {
  const user = useContext(ContextUser);
  const tasks = useContext(ContextApp);

  useEffect(() => {
    user.userInit();
  }, []);

  useEffect(() => {
    if (user.state.email) {
      tasks.fetchData();
    }
  }, [user.state]);

  return (
    <BrowserRouter>
      <Navbar />
      <div className='container py-3'>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/tasks' component={user.state.email ? TasksPage : AuthPage} />
          <Route path='/auth' component={AuthPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
