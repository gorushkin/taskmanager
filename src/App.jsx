import React from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import TasksPage from './pages/TasksPage';

const App = () => (
  <Router>
    <Route path='/' exact component={IndexPage} />
    <Route path='/tasks' component={TasksPage} />
  </Router>
);

export default App;