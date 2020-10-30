import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { ContextUser } from './user';
import Navbar from './components/Navbar';

const App = () => {
  const user = useContext(ContextUser);
  console.log(user.state.isGuest);

  useEffect(() => {
    user.userInit();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className='container py-3'>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/tasks' component={user.state.isGuest ? AuthPage : TasksPage} />
          <Route path='/auth' component={AuthPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
