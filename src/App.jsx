import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import AuthPage from './pages/AuthPage';
import IndexPage from './pages/IndexPage';
import { ContextUser } from './user';

const App = () => {
  const user = useContext(ContextUser);

  useEffect(() => {
    user.userInit();
  }, []);

  return (
    <Router>
      <Switch>
        <Router>
          <Route path='/' exact component={IndexPage} />
          <Route path='/auth' component={AuthPage} />
          <Route path='/tasks' component={TasksPage} />
        </Router>
      </Switch>
    </Router>
  );
};

export default App;
