import React from 'react';

const IndexPage = () => (
  <div className='jumbotron jumbotron-fluid'>
    <div className='container'>
      <h1 className='display-2'>Task Manager</h1>
      <h2 className='display-5'>Cервис для ведения списка задач</h2>
      <p className='lead pb-5'></p>
      <h2 className='display-5'>Планы:</h2>
      <ul className='list-group d-flex col list-group-flush'>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          Добавить роутинг
          <span className='badge badge-secondary'>is done</span>
        </li>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          Добавить авторизацию пользователей
          <span className='badge badge-danger'>todo</span>
        </li>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          Добавить подзадачи
          <span className='badge badge-danger'>todo</span>
        </li>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          Добавить метки
          <span className='badge badge-danger'>todo</span>
        </li>
      </ul>
    </div>
  </div>
);

export default IndexPage;
