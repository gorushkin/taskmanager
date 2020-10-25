// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import TasksPage from '../pages/TasksPage';
// import AuthPage from '../pages/AuthPage';
// import IndexPage from '../pages/IndexPage';
// import { ContextUser } from '../user';

// const Routes = () => {
//   const user = useContext(ContextUser);
//   console.log('user: ', user.state);

//   if (user.state.isGuest) {
//     return (
//       <Router>
//         <Switch>
//           <Router>
//             <Route path='/' exact component={IndexPage} />
//             <Route path='/auth' component={AuthPage} />
//             <Route path='/tasks' component={IndexPage} />
//           </Router>
//         </Switch>
//       </Router>
//     );
//   }

//   return (
//     <Router>
//       <Switch>
//         <Router>
//           <Route path='/' exact component={TasksPage} />
//           <Route path='/tasks' component={TasksPage} />
//         </Router>
//       </Switch>
//     </Router>
//   );
// };

// export default Routes;
