import React, { useContext } from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { ContextUser } from '../user/';

const Navbar = () => {
  const user = useContext(ContextUser);
  const history = useHistory();

  const logoutHandler = (e) => {
    e.preventDefault();
    user.userLogout();
    history.push('/')
  };

  return (
    <nav className='navbar-expand-lg navbar navbar-dark bg-primary'>
      <span className='navbar-brand text-white'>TaskManager {user.state.email || 'NoNaMe'}</span>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link' exact to='/'>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/tasks'>
              TaskList
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/about'>
              About
            </NavLink>
          </li>
          <li className='nav-item'>
            {user.state.email ? (
              <Link to="/" onClick={logoutHandler} className='nav-link'>
                LogOut
              </Link>
            ) : (
              <NavLink className='nav-link' to='/auth'>
                LogIn / Register
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
