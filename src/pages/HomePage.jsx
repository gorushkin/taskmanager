import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className='jumbotron jumbotron-fluid'>
    <div className='container'>
      <div className='align-items-center flex-column d-flex'>
        <h1 className='display-2'>Task Manager</h1>
        <h2 className='display-5'>Cервис для ведения списка задач</h2>
        <p className='lead pb-5'></p>
        <Link to='/tasks' type='button' className='btn-lg btn-primary'>
          Перейти в список задач
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;
